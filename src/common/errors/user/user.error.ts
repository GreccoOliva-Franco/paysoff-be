import { CustomError } from '../custom.error';

const prefix = 'users-E00-';

export class UserAlreadyExistsError extends CustomError {
	constructor() {
		super();
		this.internalCode = prefix + '000';
	}
}
