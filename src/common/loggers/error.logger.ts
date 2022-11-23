export class ErrorLogger {
	static logUncaughtError(error: any): void {
		console.log(error); // TODO: create a model, service and controller for this logger so it can be used in a dashboard
	}
}
