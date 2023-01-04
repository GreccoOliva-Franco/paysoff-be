import bcrypt from 'bcrypt';
import { FindOptionsWhere } from 'typeorm';

import userRepository from '../repositories/user.repository'
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
			const { username, email, password } = credentials;

			const users = await userRepository.find({ where: [{ username }, { email }] });
			const validationErrors = users.reduce((acc: IErrorHint[], user: User) => {
				if (user.username === username) acc.push({ field: 'username', message: 'Username already in use' });
				if (user.email === email) acc.push({ field: 'email', message: 'Email already in use' });

				return acc;
			}, []);
			if (validationErrors.length) throw new UserAlreadyExistsError(validationErrors);

			const user = await userRepository.save({ username, email, password });

			return user;
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) throw error;

			throw error;
		}
	};

	async validateCredentials(credentials: IAuthCredentials): Promise<User> {
		const { username, email, password } = credentials;

		let user: User | null;
		if (username) {
			user = await userRepository.findOneBy({ username });
		} else {
			user = await userRepository.findOneBy({ email });
		}

		if (!user) throw new UserInvalidCredentialsError();

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) throw new UserInvalidCredentialsError();

		return user;
	}
}

export default new UserService();
