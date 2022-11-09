import { Router } from 'express';

import testRoutes from './tests/test.routes';

const router = Router();

router.use('/tests', testRoutes);

export default router;
