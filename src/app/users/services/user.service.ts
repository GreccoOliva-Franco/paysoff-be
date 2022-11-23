import userRepository, { UserRepository } from '../repositories/user.repository'
import { User } from '../entities/user.entity';

import { IAuthCredentials } from '../../auth/interfaces/auth.interface';
import { UserAlreadyExistsError } from '../../../common/errors/user/user.error';

export class UserService {
	constructor() { }

	async create(credentials: IAuthCredentials): Promise<User> {
		try {
			const { email, password } = credentials;

			const isExistingUser = await userRepository.findBy({ email });
			if (isExistingUser) throw new UserAlreadyExistsError();

			const user = await userRepository.save({ email, password });

			return user;
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) throw error;

			throw error;
		}
	};
}

export default new UserService();
