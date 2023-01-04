import { DataSource, EntityTarget, Repository } from 'typeorm';

import database from '../../../infrastractures/database';

import { User } from '../entities/user.entity';

import { IUserRepositoryImplementation } from '../interfaces/user.interface'


export class UserRepository extends Repository<User> implements IUserRepositoryImplementation {
	constructor(target: EntityTarget<User>, database: DataSource) {
		super(target, database.manager);
	}

	async findProfileById(userId: string): Promise<User | null> {
		const fields = ['id', 'createdAt', 'email']
			.map(field => `user.${field}`);

		const user = await this
			.createQueryBuilder('user')
			.where('user.id = :userId', { userId })
			.select(fields)
			.getOne();

		return user;
	}

	async findOneByEmailWithPassword(email: string): Promise<User | null> {
		const fields = ['email', 'password']
			.map(field => `user.${field}`);

		const user = await this
			.createQueryBuilder('user')
			.where("user.email = :email", { email })
			.select(fields)
			.getOne();

		return user;
	}
}

export default new UserRepository(User, database);
