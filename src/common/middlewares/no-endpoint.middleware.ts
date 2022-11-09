import { Request, Response } from 'express';
import httpCodes from 'http-status-codes';

export function noEndpointMiddleware(_: Request, res: Response) {
	res.status(httpCodes.NOT_IMPLEMENTED).json({ error: 'Endpoint not implemented'});
}
