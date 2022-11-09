import { Router, Request, Response } from 'express';
import HttpCodes from 'http-status-codes';

const router = Router();

router.get('/test', (_: Request, res: Response) => res.status(HttpCodes.OK).json({ success: true }))

export default router;
