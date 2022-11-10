import { Request, Response } from 'express';
import httpCodes from 'http-status-codes';

import { BaseController } from '../../common/controllers/base.controller'

import authService, { AuthService } from './auth.service';

export class AuthController extends BaseController {
	constructor(service: AuthService) {
		super(service);
	};

	public async register(req: Request, res: Response) {
		const { email, password } = req.body;

		await this.service.registerNewUser({ email, password });

		return res.status(httpCodes.CREATED)
	}
}

export default new AuthController(authService)
