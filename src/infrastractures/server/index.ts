import express, { Application } from 'express';

export class Server {
	private apps: Application[] = [];
	private server: Application;

	constructor(private readonly deployConfig) {
		this.server = express();
	}

	loadApp(app: Application) {
		this.apps.push(app);
	}

	start() {
		if (!this.apps.length) throw new Error('App is not loaded');

		this.apps.forEach(app => this.server.use(app));

		this.server.listen(this.deployConfig.port, () => console.log(`Server running on port ${this.deployConfig.port}`));
	}
}
