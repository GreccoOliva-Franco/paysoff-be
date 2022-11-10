import { UtilityService } from "../../common/services/utility.service";

import userService, { UserService } from "../users/user.service";

import { IAuthCredentials } from "./interfaces/auth.interface";

export class AuthService extends UtilityService {
	constructor(private readonly userService: UserService) {
		super()
	}

	public async registerNewUser(credentials: IAuthCredentials): Promise<void> {
		await this.userService.create(credentials);
	}
}

export default new AuthService(userService);
