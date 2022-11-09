import dotenv from 'dotenv'

import enviromentConfig from '../enviroment'

dotenv.config({ path: enviromentConfig.path });

export default {
	jwt: {
		secret: process.env.AUTH_JWT_SECRET!,
		expiresTime: process.env.AUTH_JWT_EXPIRES_IN!,
		refreshExpireTime: process.env.AUTH_JWT_REFRESH_EXPIRES_IN!,
	}
}
