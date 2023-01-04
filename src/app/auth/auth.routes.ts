import { Router } from 'express';

import authController from './controllers/auth.controller';

const router = Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/refresh', authController.refresh);

export default router;
