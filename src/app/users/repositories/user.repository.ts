import { DataSource, EntityTarget, Repository } from 'typeorm';

import database from '../../../infrastractures/database';

import { User } from '../entities/user.entity';

import { IUserRepositoryImplementation } from '../interfaces/user.interface'


export class UserRepository extends Repository<User> implements IUserRepositoryImplementation {
	constructor(target: EntityTarget<User>, database: DataSource) {
		super(target, database.manager);
	}

	async findProfileById(userId: string): Promise<User | null> {
		const profileFields = ['id', 'createdAt', 'username', 'email'];

		const user = await this
			.createQueryBuilder('user')
			.where('user.id = :userId', { userId })
			.select(profileFields)
			.getOne();

		return user;
	}
}

export default new UserRepository(User, database);
