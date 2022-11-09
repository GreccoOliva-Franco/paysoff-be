import { Router } from 'express';

import testRoutes from './tests/test.routes';
import authRoutes from './auth/auth.routes';

const router = Router();

router.use('/tests', testRoutes);
router.use('/auth', authRoutes);

export default router;
