import { IsString, IsNotEmpty, IsOptional, IsEmail, Length } from 'class-validator';
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../../../configs/business/users/user.config';

export class AuthLoginDto {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	username?: string;

	@IsString()
	@IsEmail()
	@IsNotEmpty()
	@IsOptional()
	email?: string;

	@IsString()
	@IsNotEmpty()
	@Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
	password: string;
}
