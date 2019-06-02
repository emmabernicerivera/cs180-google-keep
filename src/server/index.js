const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://cs180keep-38e61.firebaseio.com',
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Add headers for http requests
app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,origin,content-type,accept'
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', (req, res) => {
	admin
		.messaging()
		.send(req.body)
		.then(response => {
			// Response is a message ID string.
			console.log('Successfully sent message:', response);
		})
		.catch(error => {
			console.log('Error sending message:', error);
		});
});

app.listen(8000, () => console.log('We are listening at localhost:8000'));
