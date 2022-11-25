import { Request, Response } from "express";

export interface IAuthController {
	register: (req: Request, res: Response) => Promise<Response>;
	login: (req: Request, res: Response) => Promise<Response>;
}

export interface IAuthService {
	registerNewUser: (credentials: IAuthCredentials) => Promise<void>;
	login: (credentials: IAuthCredentials) => Promise<IAuthTokens>;
}

export interface IAuthCredentials {
	username: string;
	email: string;
	password: string;
}

export interface IAuthTokens {
	[key: string]: string
}

export interface IAuthTokenPayload {
	userId: string;
	username?: string;
}
