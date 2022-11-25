import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

import { IUser } from "../interfaces/user.interface";

@Entity('users')
export class User implements IUser {
	// metadata
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ default: false })
	isVerifiedEmail: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn({ default: null })
	updatedAt: Date;

	@Column({ default: true })
	isActive: boolean;

	@DeleteDateColumn({ default: null })
	deletedAt: Date;

	// data
	@Column({ nullable: true })
	username: string;

	@Column()
	password: string;

	@Column()
	email: string;
}
