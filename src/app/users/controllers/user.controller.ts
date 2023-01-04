import { Request, Response } from "express";
import httpCode from "http-status-codes";

import { ErrorLogger } from "../../../common/loggers/error.logger";

import userService from "../services/user.service";

export class UserController {
	constructor() { }

	async findProfileUserById(req: Request, res: Response): Promise<Response> {
		try {

			const { userId } = req.params;
			if (!userId) return res.status(httpCode.BAD_REQUEST).json({ error: '\"userId\" must be specified' })

			const user = await userService.findProfileById(userId!);

			return res.status(httpCode.OK).json(user);
		} catch (error) {
			ErrorLogger.logUncaughtError(error);

			return res.status(httpCode.INTERNAL_SERVER_ERROR).json();
		}
	}
}

export default new UserController();
