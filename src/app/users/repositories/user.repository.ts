import { DataSource, EntityTarget, Repository } from 'typeorm';

import database from '../../../infrastractures/database';

import { User } from '../entities/user.entity';

import { IUserRepositoryImplementation } from '../interfaces/user.interface'


export class UserRepository extends Repository<User> implements IUserRepositoryImplementation {
	constructor(target: EntityTarget<User>, database: DataSource) {
		super(target, database.manager);
	}

	async findProfileById(userId: string): Promise<User | null> {
		const fields = this.buildFields(['id', 'createdAt', 'email']);


		const user = await this
			.createQueryBuilder('user')
			.where('user.id = :userId', { userId })
			.select(fields)
			.getOne();

		return user;
	}

	async findOneByEmailWithPassword(email: string): Promise<User | null> {
		const fields = this.buildFields(['email', 'password']);


		const user = await this
			.createQueryBuilder('user')
			.where("user.email = :email", { email })
			.select(fields)
			.getOne();

		return user;
	}

	private buildFields(fields: string[]): string[] {
		return fields.map(field => `user.${field}`);
	}
}

export default new UserRepository(User, database);
