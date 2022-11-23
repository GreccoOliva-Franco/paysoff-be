import 'reflect-metadata';

import database from './infrastractures/database';
import { Server } from './infrastractures/server';

import deployConfig from './configs/deploy';

import app from './app';

async function run() {
	await database.initialize();

	const server = new Server(deployConfig);

	server.loadApp(app);

	server.start();
}

run();
