import { Request, Response, NextFunction } from 'express';
import httpCode from 'http-status-codes';

import passport from '../strategies/auth-jwt.strategy';

import { User } from '../../users/entities/user.entity';

export class AuthMiddleware {
	static isOwnResource() {
		return function (req: Request, res: Response, next: NextFunction) {
			const { id: requesterId } = <User>req.user;
			const { userId: targetId } = req.params!;

			if (requesterId !== targetId) return res.status(httpCode.FORBIDDEN).json();

			next();
		}
	}

	static bearer() {
		return passport.authenticate('jwt-bearer', { session: false })
	}
}
