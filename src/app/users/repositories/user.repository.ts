import { DataSource, EntityTarget, Repository } from 'typeorm';

import database from '../../../infrastractures/database';

import { User } from '../entities/user.entity';

import { IUserRepositoryImplementation } from '../interfaces/user.interface'


export class UserRepository extends Repository<User> implements IUserRepositoryImplementation {
	static instance: UserRepository;

	constructor(target: EntityTarget<User>, database: DataSource) {
		super(target, database.manager);
	}

	static getInstance(): UserRepository {
		if (!UserRepository.instance) UserRepository.instance = new UserRepository(User, database);

		return UserRepository.instance;
	}
}

export default UserRepository.getInstance();
