import userService from "../../users/services/user.service";

import { IAuthCredentials } from "../interfaces/auth.interface";

import { UserAlreadyExistsError } from "../../../common/errors/user/user.error";

export class AuthService {
	constructor() { };

	async registerNewUser(credentials: IAuthCredentials): Promise<void> {
		try {
			await userService.create(credentials);
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) throw error;

			throw error;
		}
	}
}

export default new AuthService();
