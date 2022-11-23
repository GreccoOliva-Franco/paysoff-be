import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

import { IUser } from "../interfaces/user.interface";

@Entity('users')
export class User extends BaseEntity implements IUser {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: true })
	username: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@Column({ default: false })
	isVerifiedEmail: boolean;
}
