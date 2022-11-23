import userRepository, { UserRepository } from '../repositories/user.repository'
import { User } from '../entities/user.entity';

import { IAuthCredentials } from '../../auth/interfaces/auth.interface';

export class UserService {
	constructor() { }

	async create(credentials: IAuthCredentials): Promise<User> {
		const { email, password } = credentials;

		const user = await userRepository.save({ email, password });
		console.log(user);

		return user;
	};
}

export default new UserService();
