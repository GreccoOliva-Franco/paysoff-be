import { IResponseBody } from '../responses/interfaces';
import { ICustomError } from '../errors/interaces/error.interface';

import ErrorDictionary from '../errors/errors';

export class BaseController {
	constructor(protected readonly service?: any) { }

	protected buildSuccessResponse(data?: any, errors?: any): IResponseBody {
		const response: IResponseBody = { success: true };

		if (data) response.data = data;
		if (errors) response.errors = errors;

		return response;
	}

	protected buildErrorResponse(error: ICustomError): IResponseBody {

		const { internalCode } = error;
		const errorBody = ErrorDictionary[internalCode];

		return errorBody;
	}
}
