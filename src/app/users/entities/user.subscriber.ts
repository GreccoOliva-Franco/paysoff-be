import bcrypt from "bcrypt";
import { EventSubscriber, InsertEvent } from "typeorm";

import { User } from "./user.entity";

import hashConfig from "../../../configs/hash";

@EventSubscriber()
export class UserSubscriber {
	listenTo() {
		return User;
	}

	private async hashPassword(password: string): Promise<string> {
		const hashedPassword = await bcrypt.hash(password, hashConfig.rounds)

		return hashedPassword
	}

	async beforeInsert(event: InsertEvent<User>): Promise<User> {
		const user = event.entity;

		const hashedPassword = await this.hashPassword(user.password)
		user.password = hashedPassword;

		return user;
	}
}
