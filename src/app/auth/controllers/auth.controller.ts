import { Request, Response } from 'express';
import httpCodes from 'http-status-codes';

import { IAuthController } from '../interfaces/auth.interface';

import authService, { AuthService } from '../services/auth.service';

export class AuthController implements IAuthController {
	constructor() { };

	async register(req: Request, res: Response) {
		const { email, password } = req.body;

		await authService.registerNewUser({ email, password });

		return res.status(httpCodes.CREATED).json();
	}
}

export default new AuthController();
