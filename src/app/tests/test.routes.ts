// External modules
import { Router, Request, Response } from 'express';
import HttpCodes from 'http-status-codes';
import { FindManyOptions } from 'typeorm';

// Infrastructure
import database from '../../infrastractures/database';

import userRepository from '../users/repositories/user.repository';
import { User } from '../users/entities/user.entity';

const router = Router();

router.get('/test', (_: Request, res: Response) => res.status(HttpCodes.OK).json({ success: true }))
router.get('/database', (_: Request, res: Response) => {
	const status = database.isInitialized;

	return res.status(HttpCodes.OK).json({ database: { status } });
})
router.get('/users', async (req: Request, res: Response) => {
	const { passwords } = req.query;

	const filter: FindManyOptions<User> = passwords ? { select: ['id', 'email', 'password'] } : {};

	const users = await userRepository.find(filter);

	return res.status(HttpCodes.OK).json({ users });
})
router.delete('/users', async (_: Request, res: Response) => {
	await userRepository.delete({});

	return res.status(HttpCodes.OK).json();
})
export default router;
