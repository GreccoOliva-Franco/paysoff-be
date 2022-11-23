import userService from "../../users/services/user.service";

import { IAuthCredentials } from "../interfaces/auth.interface";

export class AuthService {
	constructor() { };

	async registerNewUser(credentials: IAuthCredentials): Promise<void> {
		await userService.create(credentials);
	}
}

export default new AuthService();
