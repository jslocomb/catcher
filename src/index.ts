import * as express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
    }

    private loadConfig(): void {
        dotenv.config({ path : path.join(__dirname, '../.env') })
    }

    public start(): any {
        const port: number = 3000;
        this.loadConfig();
        //Locals.config().port;

		// Registering Exception / Error Handlers
		// this.express.use(ExceptionHandler.logErrors);
		// this.express.use(ExceptionHandler.clientErrorHandler);
		// this.express.use(ExceptionHandler.errorHandler);
		// this.express = ExceptionHandler.notFoundHandler(this.express);

		// Start the server on the specified port
		this.app.listen(port, (_error: any) => {
			if (_error) {
				return console.log('Error: ', _error);
			}

			return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${port}'`);
		});

    }

}

class Express {
	/**
	 * Create the express object
	 */
	public express: express.Application;

	/**
	 * Initializes the express server
	 */
	constructor () {
		this.express = express();

		this.mountDotEnv();
		this.mountMiddlewares();
		this.mountRoutes();
	}

	private mountDotEnv (): void {
		//this.express = Locals.init(this.express);
	}

	/**
	 * Mounts all the defined middlewares
	 */
	private mountMiddlewares (): void {
		//this.express = Bootstrap.init(this.express);
	}

	/**
	 * Mounts all the defined routes
	 */
	private mountRoutes (): void {
		//this.express = Routes.mountWeb(this.express);
		//this.express = Routes.mountApi(this.express);
	}

	/**
	 * Starts the express server
	 */
	public init (): any {
        const port: number = 3000;
        //Locals.config().port;

		// Registering Exception / Error Handlers
		// this.express.use(ExceptionHandler.logErrors);
		// this.express.use(ExceptionHandler.clientErrorHandler);
		// this.express.use(ExceptionHandler.errorHandler);
		// this.express = ExceptionHandler.notFoundHandler(this.express);

		// Start the server on the specified port
		this.express.listen(port, (_error: any) => {
			if (_error) {
				return console.log('Error: ', _error);
			}

			return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${port}'`);
		});
	}
}

export default new Express();