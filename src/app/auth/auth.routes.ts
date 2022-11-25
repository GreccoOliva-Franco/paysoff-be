import { Router } from 'express';
import { makeValidateBody } from 'express-class-validator';

import authController from './controllers/auth.controller';

import { AuthRegisterDto, AuthLoginDto } from './dtos/auth.dto';

const router = Router();

router.post('/register', authController.register);
router.post('/login', makeValidateBody(AuthLoginDto), authController.login);

export default router;
