import { CustomError } from '../custom.error';

import { IErrorHint } from '../interaces/error.interface';

const prefix = 'users-E00-';

export class UserAlreadyExistsError extends CustomError {
	constructor(errors: IErrorHint[]) {
		const name = 'UserAlreadyExistsError';
		const message = 'User already exists';
		const internalCode = `${prefix}000`;
		super({ name, message, errors, internalCode });
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
