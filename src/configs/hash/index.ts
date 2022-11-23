import dotenv from 'dotenv';

import enviromentConfig from '../enviroment';

dotenv.config({ path: enviromentConfig.path });

export default {
	rounds: parseInt(process.env.HASH_ROUNDS!),
}
