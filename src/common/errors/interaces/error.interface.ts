export interface ICustomError extends Error {
	internalCode: string;
	errors?: any[];
}

export interface IErrorHint {
	field: string;
	message: string;
}
