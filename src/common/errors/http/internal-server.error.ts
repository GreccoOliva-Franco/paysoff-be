export class InternalServerError extends Error {
	constructor(error: Error) {
		super(error.message);
		this.name = 'InternalServerError';
	}
}
