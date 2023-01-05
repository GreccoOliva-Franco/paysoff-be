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

router.patch(
	'/:userId',
	AuthMiddleware.bearer(),
	AuthMiddleware.isOwnResource(),
	userController.updateById
)

export default router;
