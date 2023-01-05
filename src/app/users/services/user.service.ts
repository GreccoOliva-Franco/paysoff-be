import bcrypt from 'bcrypt';
import { FindOptionsWhere, UpdateResult } from 'typeorm';

import userRepository, { UserRepository } from '../repositories/user.repository'
import { User } from '../entities/user.entity';

import { IAuthCredentials } from '../../auth/interfaces/auth.interface';
import { UserAlreadyExistsError, UserInvalidCredentialsError } from '../../../common/errors/users/user.error';

import { IErrorHint } from '../../../common/errors/interaces/error.interface';

export class UserService {
	constructor() { }

	async findOneBy(criteria: FindOptionsWhere<User>): Promise<User | null> {
		return userRepository.findOneBy(criteria);
	}

	async findProfileById(userId: string): Promise<User | null> {
		const user = await userRepository.findProfileById(userId);

		return user;
	}

	async create(credentials: IAuthCredentials): Promise<User> {
		try {
			const { email, password } = credentials;

			let user = await userRepository.findOneBy({ email });
			if (user) throw new UserAlreadyExistsError();

			user = await userRepository.save({ email, password });

			return user;
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) throw error;

			throw error;
		}
	};

	async updateById(userId: string, data: Partial<User>): Promise<User | null> {
		try {
			await userRepository.update({ id: userId }, data);

			const user = (await userRepository.findProfileById(userId));

			return user;
		} catch (error) {
			throw error;
		}
	}

	async updatePasswordById(userId: string, password: string): Promise<UpdateResult> {
		try {
			const updateResult = await userRepository.update({ id: userId }, { password });

			return updateResult;
		} catch (error) {
			throw error;
		}
	}

	async validateCredentials(credentials: IAuthCredentials): Promise<boolean> {
		const { email, password } = credentials;

		const user = await userRepository.findOneByEmailWithPassword(email);
		if (!user) return false;

		const isValidPassword = await bcrypt.compare(password, user.password);

		return isValidPassword;
	}
}

export default new UserService();
