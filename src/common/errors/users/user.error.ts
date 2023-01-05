import { CustomError } from '../custom.error';

const prefix = 'users-E00-';

export class UserAlreadyExistsError extends CustomError {
	constructor() {
		const name = 'UserAlreadyExistsError';
		const message = 'User already exists';
		const internalCode = `${prefix}000`;
		super({ name, message, internalCode });
	}
}

export class UserInvalidCredentialsError extends CustomError {
	constructor() {
		const name = 'UserWrongCredentialsError';
		const message = 'Invalid credentials';
		const internalCode = `${prefix}001`;
		super({ name, message, internalCode });
	}
}

export class UserDoesNotExistError extends CustomError {
	constructor() {
		const name = 'UserDoesNotExistError';
		const message = 'User does not exist';
		const internalCode = `${prefix}002`;
		super({ name, message, internalCode });
	}
}
