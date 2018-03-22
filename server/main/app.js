const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const redis = require('redis');

this.bizNetworkConnection = new BusinessNetworkConnection();
this.cardName = config.get('cardName');
this.businessNetworkIdentifier = 'tutorial-network.bna';

require('dotenv-safe').config(); // automatically configure environment variables from .env
require('./config/mongoDatabase')(); // Connection to Database
require('./config/Array_remove_polyfill')(); // polyfill for Array remove by value -> arr.remove('value')

// global configs
global.async = require('async');
global.redisClient = redis.createClient();
// global.activeNotificationSubscribers = new Set();
global.activeNotificationSubscribersResponse = {};

redisClient
	.on('connect', () => {
		console.log('[REDIS] Connected to Redis Store');
	})
	.on('error', (err) => {
		console.error('[REDIS] Error:', err); // log errors from redis store
	});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('morgan')('dev'));

// Routes
app.use('/api', require(path.join(__dirname, 'src', 'routes', 'routes.js')));

app.listen(process.env.PORT, () => {
	console.log(`Application running on port ${process.env.PORT}`);
});

module.exports = app;