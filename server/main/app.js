const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv-safe').config(); // automatically configure environment variables from .env

// global configs
global.async = require('async');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/', require(path.join(__dirname, 'src', 'routes', 'routes.js')));

app.listen(process.env.PORT, () => console.log(`Application running on port ${process.env.PORT}`));

module.exports = app;