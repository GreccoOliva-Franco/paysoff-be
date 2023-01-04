import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

import { IUser } from "../interfaces/user.interface";
@Entity('users')
export class User implements IUser {
	// metadata
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn({ default: null })
	updatedAt: Date;

	@DeleteDateColumn({ default: null })
	deletedAt: Date;

	@Column({ nullable: false, default: true })
	isActive: boolean;

	@Column({ nullable: false, default: false })
	isVerifiedEmail: boolean;

	// data
	@Column({ nullable: false, unique: true })
	email: string;

	@Column({ nullable: false, select: false })
	password: string;
}
