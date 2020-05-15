import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';

import memoryCache, { CacheClass } from 'memory-cache';


dotenv.config({ path : path.join(__dirname, '../.env') })

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = 3000;
var events = new Array<CatchEvent>(); 

//Locals.config().port;

// Registering Exception / Error Handlers
// this.express.use(ExceptionHandler.logErrors);
// this.express.use(ExceptionHandler.clientErrorHandler);
// this.express.use(ExceptionHandler.errorHandler);
// this.express = ExceptionHandler.notFoundHandler(this.express);

class CatchEvent {
	public dateTs: Date;
	public data: string;

	constructor(data: string) {
		this.dateTs = new Date();
		this.data = data;
	}
}

app.set('view engine', 'pug');
app.set('view options', { pretty: true });
app.set('views', path.join(__dirname, '../views'));

app.use(bodyParser.json());

app.post("/", function (req, res) {
	
	console.log(req.body);

	var ce = new CatchEvent(JSON.stringify(req.body));

	events.push(ce);
	
	if (events.length > 100)
	{
		events.shift();
	}
	res.status(200).send(req.body);
});

app.get("/show", function (req, res) {
	res.render('show', { title: 'Hey', app: app, catchEvents : events })
});

app.use(favicon(path.join(__dirname,'../assets','favicon.ico')));

// Start the server on the specified port
app.listen(port, (_error: any) => {
	if (_error) {
		return console.log("Error: ", _error);
	}
	console.log("\x1b[33m%s\x1b[0m", `Server :: Running @ http://localhost:${port}`);
});

