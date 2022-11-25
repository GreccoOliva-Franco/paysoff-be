import { CustomError } from "../custom.error";

const prefix = "auth-E00-";

export class AuthTokenExpiredError extends CustomError {
	constructor() {
		const name = "AuthTokenExpiredError";
		const message = "Refresh token expired";
		const internalCode = `${prefix}000`;
		super({ name, message, internalCode });
	}
}

export class AuthTokenInvalidError extends CustomError {
	constructor(message: string) {
		const name = "AuthTokenInvalidError";
		const internalCode = `${prefix}001`;
		super({ name, message, internalCode });
	}
}
