// External modules
import { Router, Request, Response } from 'express';
import HttpCodes from 'http-status-codes';

// Infrastructure
import database from '../../infrastractures/database';
import userRepository from '../users/repositories/user.repository';

const router = Router();

router.get('/test', (_: Request, res: Response) => res.status(HttpCodes.OK).json({ success: true }))
router.get('/database', (_: Request, res: Response) => {
	const status = database.isInitialized;

	return res.status(HttpCodes.OK).json({ database: { status } });
})
router.get('/users', async (_: Request, res: Response) => {
	const users = await userRepository.find();

	return res.status(HttpCodes.OK).json({ users });
})
router.delete('/users', async (_: Request, res: Response) => {
	await userRepository.delete({});

	return res.status(HttpCodes.OK).json();
})
export default router;
