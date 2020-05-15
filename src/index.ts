import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import memoryCache, { CacheClass } from 'memory-cache';
import moment from 'moment';
import prettyHtml from 'json-pretty-html';


dotenv.config({ path : path.join(__dirname, '../.env') })

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = 3000;
var events = new Array<CatchEvent>(); 

//Locals.config().port;

class CatchEvent {
	public dateTs: string;
	public data: string;

	constructor(data: string) {
		this.dateTs = moment().format();
		this.data = data;
	}
}

app.set('view engine', 'pug');
app.set('view options', { pretty: true });
app.set('views', path.join(__dirname, '../views'));

app.locals.pretty = true;

app.use(bodyParser.json());

app.post("/", function (req, res) {
	
	let prettyData: string = prettyHtml(req.body);
	console.log(prettyData);
	
	var ce = new CatchEvent(prettyData);

	events.push(ce);
	
	if (events.length > 100)
	{
		events.shift();
	}
	res.status(200).send();
});

app.get("/show", function (req, res) {
	res.render('show', { title: 'Show Events', app: app, catchEvents : events })
});

app.use(favicon(path.join(__dirname,'../assets','favicon.ico')));
app.use(express.static(path.join(__dirname, '../assets')));

// Start the server on the specified port
app.listen(port, (_error: any) => {
	if (_error) {
		return console.log("Error: ", _error);
	}
	console.log("\x1b[33m%s\x1b[0m", `Server :: Running @ http://localhost:${port}`);
});

