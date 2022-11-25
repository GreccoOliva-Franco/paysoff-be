import dotenv from 'dotenv'

import enviromentConfig from '../enviroment'

dotenv.config({ path: enviromentConfig.path });

export default {
	jwt: {
		tokens: {
			access: {
				secret: process.env.AUTH_TOKEN_ACCESS_SECRET!,
				expireTime: process.env.AUTH_TOKEN_ACCESS_EXPIRE_TIME!,
			},
			refresh: {
				secret: process.env.AUTH_TOKEN_REFRESH_SECRET!,
				expireTime: process.env.AUTH_TOKEN_REFRESH_EXPIRE_TIME!,
			},
		}
	}
}
