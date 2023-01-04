import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import httpCode from 'http-status-codes';

import { User } from '../../users/entities/user.entity';

export class AuthMiddleware {
	static isOwnResource(req: Request, res: Response, next: NextFunction) {
		const { id: requesterId } = <User>req.user;
		const { userId: targetId } = req.params!;

		if (requesterId !== targetId) return res.status(httpCode.FORBIDDEN)

		next();
	}

	static bearer(_: Request, __: Response, ___: NextFunction): void {
		return passport.authenticate('jwt', { session: false })
	}
}
