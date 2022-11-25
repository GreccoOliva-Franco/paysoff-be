import { Request, Response } from "express";

import httpCodes from 'http-status-codes';

export function notFoundHandler(_: Request, res: Response) {
	return res.status(httpCodes.NOT_FOUND).json({
		success: false,
		message: 'Endpoint not found'
	});
}
