import { Request, Response } from "express";
import { User } from "../../users/entities/user.entity";

export interface IAuthController {
	signUp: (req: Request, res: Response) => Promise<Response>;
	signIn: (req: Request, res: Response) => Promise<Response>;
	refresh: (req: Request, res: Response) => Promise<Response>;
}

export interface IAuthService {
	signUp: (credentials: IAuthCredentials) => Promise<void>;
	signIn: (credentials: IAuthCredentials) => Promise<IAuthTokens>;
	refresh: (token: any) => Promise<IAuthTokens>;
}

export interface IAuthCredentials {
	email: string;
	password: string;
}

export interface IAuthTokens {
	[key: string]: string
}

export interface IAuthTokenPayload {
	userId: string;
	email?: string;
}
