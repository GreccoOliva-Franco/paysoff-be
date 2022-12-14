import { Request, Response } from 'express';
import httpCodes from 'http-status-codes';

import { IAuthController } from '../interfaces/auth.interface';

import authService from '../services/auth.service';

import { UserAlreadyExistsError, UserInvalidCredentialsError } from '../../../common/errors/users/user.error';
import { AuthTokenExpiredError, AuthTokenInvalidError } from '../../../common/errors/auth/auth.error';
import { ErrorLogger } from '../../../common/loggers/error.logger';
import { AuthRefreshDto, AuthResetPasswordDto, AuthResetPasswordTokenDto, AuthSignDto } from '../dtos/auth.dto';

export class AuthController implements IAuthController {
	constructor() { };

	async signUp(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = <AuthSignDto>req.body;

			await authService.signUp({ email, password });

			return res.status(httpCodes.CREATED).json();
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) return res.status(httpCodes.BAD_REQUEST).json({ error: error.message });

			ErrorLogger.logUncaughtError(error)
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json();
		}
	}

	async signIn(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = <AuthSignDto>req.body;

			const tokens = await authService.signIn({ email, password });

			return res.status(httpCodes.OK).json(tokens);
		} catch (error) {
			if (error instanceof UserInvalidCredentialsError) return res.status(httpCodes.UNAUTHORIZED).json({ error: error.errors });

			ErrorLogger.logUncaughtError(error)
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json();
		}
	};

	async refresh(req: Request, res: Response): Promise<Response> {
		try {
			const { refreshToken } = <AuthRefreshDto>req.body;

			const tokens = await authService.refresh(refreshToken);

			return res.status(httpCodes.OK).json(tokens);
		} catch (error) {
			if (error instanceof AuthTokenExpiredError) return res.status(httpCodes.UNAUTHORIZED).json({ error: error.message });
			if (error instanceof AuthTokenInvalidError) return res.status(httpCodes.UNAUTHORIZED).json({ error: error.message });

			ErrorLogger.logUncaughtError(error)
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json();
		}
	}

	async getResetPasswordToken(req: Request, res: Response): Promise<Response> {
		try {
			const { email } = <AuthResetPasswordTokenDto>req.body;

			const resetToken = await authService.getResetPasswordToken(email); // TODO: change functionality to send email

			return res.status(httpCodes.OK).json({ resetToken });
		} catch (error) {
			ErrorLogger.logUncaughtError(error)

			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json();
		}
	}

	async changePassword(req: Request, res: Response): Promise<Response> {
		try {
			const { passwordToken: token, password } = <AuthResetPasswordDto>req.body;

			await authService.changePassword({ token, password });

			return res.status(httpCodes.OK).json();
		} catch (error) {
			ErrorLogger.logUncaughtError(error)

			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json();
		}
	}
}

export default new AuthController();
