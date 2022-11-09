import dotenv from 'dotenv';

import enviromentConfig from '../enviroment';

dotenv.config({ path: enviromentConfig.path });

export default {
	secret: process.env.HASH_SECRET!,
	rounds: process.env.HASH_ROUNDS!,
}
