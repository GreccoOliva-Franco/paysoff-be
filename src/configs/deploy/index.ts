import dotenv from 'dotenv';

import enviromentConfig from '../enviroment';

dotenv.config({ path: enviromentConfig.path });

export default {
	port: process.env.DEPLOY_PORT,
	host: process.env.DEPLOY_HOST,
}
