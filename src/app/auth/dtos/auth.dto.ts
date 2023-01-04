import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import userBusinessConfigs from '../../../configs/business/users/user-business.config'
export class AuthSignDto {
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
