export abstract class CustomError extends Error {
	public name: string;
	public message: string;
	public stack?: string | undefined;
	public internalCode: string;
}
