// External modules
import { Router, Request, Response } from 'express';
import HttpCodes from 'http-status-codes';

// Infrastructure
import database from '../../infrastractures/database';

const router = Router();

router.get('/test', (_: Request, res: Response) => res.status(HttpCodes.OK).json({ success: true }))
router.get('/database', (_: Request, res: Response) => {
	const status = database.isInitialized;

	return res.status(HttpCodes.OK).json({ database: { status } });
})
export default router;
