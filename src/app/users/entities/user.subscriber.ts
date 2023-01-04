import bcrypt from "bcrypt";
import { EventSubscriber, InsertEvent, ObjectLiteral, UpdateEvent } from "typeorm";

import { User } from "./user.entity";

import hashConfig from "../../../configs/hash";

@EventSubscriber()
export class UserSubscriber {
	listenTo() {
		return User;
	}

	async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, hashConfig.rounds);
	}

	async beforeInsert(event: InsertEvent<User>): Promise<User> {
		const user = event.entity;

		user.password = await this.hashPassword(user.password);

		return user;
	}

	async beforeUpdate(event: UpdateEvent<User>): Promise<ObjectLiteral | undefined> {
		const fields = event.entity;

		if (fields?.password) fields.password = await this.hashPassword(fields.password);

		return fields;
	}
}
