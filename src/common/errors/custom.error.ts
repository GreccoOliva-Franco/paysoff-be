import { ICustomError } from "./interaces/error.interface";

export abstract class CustomError extends Error {
	public name: string;
	public message: string;
	public stack?: string;
	public errors: any[];
	public internalCode: string;

	constructor({ name, message, errors, stack, internalCode }: ICustomError) {
		super(message);
		this.name = name;
		this.message = message;
		if (errors) this.errors = errors;
		this.stack = stack;
		this.internalCode = internalCode;
	}
}
