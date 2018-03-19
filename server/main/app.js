const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

this.bizNetworkConnection = new BusinessNetworkConnection();
this.cardName = config.get('cardName');
this.businessNetworkIdentifier = 'tutorial-network.bna';

require('dotenv-safe').config(); // automatically configure environment variables from .env
require('./config/mongoDatabase')(); // Connection to Database

// global configs
global.async = require('async');

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