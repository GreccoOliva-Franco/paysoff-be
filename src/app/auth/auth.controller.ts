import { Request, Response } from 'express';
import httpCodes from 'http-status-codes';

import { BaseController } from '../../common/controllers/base.controller'

import authService, { AuthService } from './auth.service';

import { ErrorLogger } from '../../common/loggers/error.logger';


export class AuthController extends BaseController {
	constructor(service: AuthService) {
		super(service);
	};

	public async register(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			await this.service.registerNewUser({ email, password });

			return res.status(httpCodes.CREATED).json(this.buildSuccessResponse)
		} catch (error) {
			// if (error instanceof CreateUserError) return res.status(httpCodes.BAD_REQUEST).json(this.buildErrorResponse(error));
			ErrorLogger.logUncaughtError({ function: 'AuthController > register', error });

			return res.status(httpCodes.INTERNAL_SERVER_ERROR)
		}
	}
}

export default new AuthController(authService)
