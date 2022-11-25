import jwt from 'jsonwebtoken';

import userService from "../../users/services/user.service";

import { User } from '../../users/entities/user.entity';

import authConfig from '../../../configs/auth';

import { IAuthCredentials, IAuthService, IAuthTokenPayload, IAuthTokens } from "../interfaces/auth.interface";

import { UserAlreadyExistsError, UserInvalidCredentialsError } from "../../../common/errors/users/user.error";

export class AuthService implements IAuthService {
	constructor() { };

	async registerNewUser(credentials: IAuthCredentials): Promise<void> {
		try {
			await userService.create(credentials);
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) throw error;

			throw error;
		}
	}

	async login(credentials: IAuthCredentials): Promise<IAuthTokens> {
		try {
			const user = await userService.validateCredentials(credentials);
			if (!user) throw new UserInvalidCredentialsError();

			const accessToken = this.generateAccessToken(user);
			const refreshToken = this.generateRefreshToken(user);

			return { accessToken, refreshToken };
		} catch (error) {
			throw error;
		}
	}

	generateAccessToken(user: User): string {
		const payload: IAuthTokenPayload = {
			id: user.id,
			username: user.username,
		};

		return jwt.sign(payload, authConfig.jwt.tokens.access.secret, { expiresIn: authConfig.jwt.tokens.access.expireTime });
	}

	generateRefreshToken(user: User): string {
		const payload: IAuthTokenPayload = {
			id: user.id,
		};

		return jwt.sign(payload, authConfig.jwt.tokens.refresh.secret, { expiresIn: authConfig.jwt.tokens.refresh.expireTime });
	}
}

export default new AuthService();
