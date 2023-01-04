import { IsString, IsNotEmpty, IsOptional, IsEmail, Length } from 'class-validator';
import userBusinessConfigs from '../../../configs/business/users/user-business.config'
export class AuthRegisterDto {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@Length(
		userBusinessConfigs.password.length.min,
		userBusinessConfigs.password.length.max,
	)
	password: string;
}

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
	@Length(
		userBusinessConfigs.password.length.min,
		userBusinessConfigs.password.length.max,
	)
	password: string;
}
