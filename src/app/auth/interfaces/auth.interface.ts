import { Request, Response } from "express";

export interface IAuthController {
	register: (req: Request, res: Response) => Promise<Response>;
}

export interface IAuthCredentials {
	email: string;
	password: string;
}
