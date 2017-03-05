const express = require('express');
const app = express();
const Promise = require('bluebird');
const moment = require('moment');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const dotenv = require('dotenv').config();
const getTime = require('./helpers/time');
const bodyParser = require('body-parser');
const { DB_TIMER, REF_TIMER, DB_PATH } = require('./helpers/config');
const indexRoutes = require('./routes/index');
const dashboardRoutes = require('./routes/dashboard');

const port = process.env.PORT || 3000;

const analytics = {
  websites: {},
  abCampaign: {},
  serverStats: {},
  referrer: {},
};

let timestamp = {}; // timestamp for serverStats

let isBusy = false;
let lastUpdateDbTime = null;
let lastUpdateRefTime = null;

app.use('/assets', express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/dashboard', dashboardRoutes);

// prevents some basic attacks on express framework
app.disable('x-powered-by');

app.listen(port, require('./lib/init')(analytics));

// TODO:
// configure .eslint for frontend
// rebuild html page to Pug/Jade
// flash message to use that somebody is login or logged out module name: connect-flash
// recheck authentication logic, need session
// show messages about errors when user is trying to login
// return favicon
// express-generator to change structure of project
// add react for frontend
