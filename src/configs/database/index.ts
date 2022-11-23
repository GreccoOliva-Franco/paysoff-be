import dotenv from 'dotenv'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import enviromentConfig from "../enviroment"

dotenv.config({ path: enviromentConfig.path })

const databaseConfig: PostgresConnectionOptions = {
	type: 'postgres',
	host: process.env.DATABASE_HOST!,
	port: parseInt(process.env.DATABASE_PORT!),
	username: process.env.DATABASE_USERNAME!,
	password: process.env.DATABASE_PASSWORD!,
	database: process.env.DATABASE_NAME!,
	entities: ['src/app/**/entities/*.entity.ts'],
	subscribers: ['src/app/**/entities/*.subscriber.ts'],
	synchronize: true,
	logging: false,
}

export default databaseConfig;
