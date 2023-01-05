import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { UpdateResult } from 'typeorm';

import userService from "../../users/services/user.service";

import { User } from '../../users/entities/user.entity';

import authConfig from '../../../configs/auth';

import { IAuthCredentials, IAuthService, IAuthTokens } from "../interfaces/auth.interface";

import { UserAlreadyExistsError, UserDoesNotExistError, UserInvalidCredentialsError } from "../../../common/errors/users/user.error";
import { AuthTokenExpiredError, AuthTokenInvalidError } from '../../../common/errors/auth/auth.error';

export class AuthService implements IAuthService {
	constructor() { };

	async signUp(credentials: IAuthCredentials): Promise<void> {
		try {
			await userService.create(credentials);
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) throw error;

			throw error;
		}
	}

	async signIn(credentials: IAuthCredentials): Promise<IAuthTokens> {
		try {
			const isValidPassword = await userService.validateCredentials(credentials);
			if (!isValidPassword) throw new UserInvalidCredentialsError();

			const user = (await userService.findOneBy({ email: credentials.email }))!;

			const tokens = this.generateTokens(user, ['access', 'refresh']);

			return tokens;
		} catch (error) {
			throw error;
		}
	}

	async refresh(refreshToken: string): Promise<IAuthTokens> {
		try {
			const { payload } = <JwtPayload>jwt.verify(refreshToken, authConfig.jwt.tokens.refresh.secret, { complete: true });

			const user = (await userService.findOneBy({ id: payload.userId }))!;

			const tokens = this.generateTokens(user, ['access']);

			return tokens;
		} catch (error) {
			if (error instanceof TokenExpiredError) throw new AuthTokenExpiredError();
			if (error instanceof JsonWebTokenError) throw new AuthTokenInvalidError(error.message);

			throw error;
		}
	}

	generateTokens(user: User, tokens: string[]): IAuthTokens {
		const expiresIn = (token: string) => authConfig.jwt.tokens[token].expireTime;
		const secret = (token: string) => authConfig.jwt.tokens[token].secret;

		const tokenEntries: [string, string][] = tokens
			.map((token: string) => [
				`${token}Token`,
				jwt.sign({ userId: user.id }, secret(token), { expiresIn: expiresIn(token) }),
			])

		const authTokens: IAuthTokens = Object.fromEntries(tokenEntries);

		return authTokens;
	}

	async getResetPasswordToken(email: string): Promise<IAuthTokens> {
		try {
			const user = await userService.findOneBy({ email });
			if (!user) throw new UserDoesNotExistError();

			const tokens = this.generateTokens(user, ['password']);

			return tokens;
		} catch (error) {
			throw error;
		}
	}

	async changePassword({ token, password }: { token: string, password: string }): Promise<UpdateResult> {
		try {
			const secret = authConfig.jwt.tokens.password.secret;
			const { payload } = <JwtPayload>jwt.verify(token, secret);
			const { id: userId } = <User>payload;

			const updateResult = await userService.updatePasswordById(userId, password);

			return updateResult;
		} catch (error) {
			throw error;
		}
	}
}

export default new AuthService();
