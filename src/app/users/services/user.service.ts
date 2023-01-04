import bcrypt from 'bcrypt';
import { FindOptionsWhere } from 'typeorm';

import userRepository, { UserRepository } from '../repositories/user.repository'
import { User } from '../entities/user.entity';

import { IAuthCredentials } from '../../auth/interfaces/auth.interface';
import { UserAlreadyExistsError, UserInvalidCredentialsError } from '../../../common/errors/users/user.error';

import { IErrorHint } from '../../../common/errors/interaces/error.interface';

export class UserService {
	private readonly repository: UserRepository;

	constructor() {
		this.repository = userRepository;
	}

	async findOneBy(criteria: FindOptionsWhere<User>): Promise<User | null> {
		return userRepository.findOneBy(criteria);
	}

	async findProfileById(userId: string): Promise<User | null> {
		const user = await this.repository.findProfileById(userId);

		return user;
	}

	async create(credentials: IAuthCredentials): Promise<User> {
		try {
			const { email, password } = credentials;

			let user = await this.repository.findOneBy({ email });
			if (user) throw new UserAlreadyExistsError();

			user = await this.repository.save({ email, password });

			return user;
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) throw error;

			throw error;
		}
	};

	async validateCredentials(credentials: IAuthCredentials): Promise<boolean> {
		const { email, password } = credentials;

		const user = await this.repository.findOneByEmailWithPassword(email);
		if (!user) return false;

		const isValidPassword = await bcrypt.compare(password, user.password);

		return isValidPassword;
	}
}

export default new UserService();
