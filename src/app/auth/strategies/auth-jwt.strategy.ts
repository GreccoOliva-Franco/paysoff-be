import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt, StrategyOptions, VerifyCallback } from "passport-jwt";

import authConfig from '../../../configs/auth';
import userService from "../../users/services/user.service";

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: authConfig.jwt.tokens.access.secret,
};

const verify: VerifyCallback = (payload: JwtPayload, done) => {
	userService
		.findOneBy({ id: payload.userId })
		.then((user) => {
			if (!user) return done(null, false);

			return done(null, user);
		})
		.catch((error) => done(error, false));
};

export const BearerStrategy = new Strategy(options, verify);
