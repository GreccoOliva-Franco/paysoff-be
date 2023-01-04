import { Router } from "express";

import { AuthMiddleware } from "../auth/middlewares/auth.middleware";

import userController from "./controllers/user.controller";

const router = Router();

router.use(AuthMiddleware.bearer)
router.use(AuthMiddleware.isOwnResource);

router.get(
	'/:userId',
	userController.findProfileUserById
);

export default router;
