import { Request, Response } from "express";

import httpCodes from 'http-status-codes';

export function noEndpointHandler(_: Request, res: Response) {
	return res.status(httpCodes.NOT_IMPLEMENTED).json({
		success: false,
		message: 'Endpoint not found'
	});
}
