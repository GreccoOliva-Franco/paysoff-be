import { Router } from "express";

import { AuthMiddleware } from "../auth/middlewares/auth.middleware";

import userController from "./controllers/user.controller";

const router = Router();


router.get(
	'/:userId',
	AuthMiddleware.bearer(),
	AuthMiddleware.isOwnResource(),
	userController.findProfileUserById
);

export default router;
