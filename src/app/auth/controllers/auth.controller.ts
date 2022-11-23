import { Request, Response } from 'express';
import httpCodes from 'http-status-codes';

import { IAuthController } from '../interfaces/auth.interface';

import authService from '../services/auth.service';

import { UserAlreadyExistsError } from '../../../common/errors/user/user.error';

export class AuthController implements IAuthController {
	constructor() { };

	async register(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			await authService.registerNewUser({ email, password });

			return res.status(httpCodes.CREATED).json();
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) return res.status(httpCodes.BAD_REQUEST).json({ error: 'User already exists' });

			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json();
		}
	}
}

export default new AuthController();
