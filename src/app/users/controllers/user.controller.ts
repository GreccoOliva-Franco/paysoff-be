import { Request, Response } from "express";
import httpCode from "http-status-codes";

import userService, { UserService } from "../services/user.service";

export class UserController {
	private readonly service: UserService;

	constructor() {
		this.service = userService
	}

	async findProfileUserById(req: Request, res: Response): Promise<Response> {
		try {
			const { userId } = req.params;

			const user = await this.service.findProfileById(userId!);

			return res.status(httpCode.OK).json(user);
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json();
		}
	}
}

export default new UserController();
