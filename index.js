const app = require('express')();
const Promise = require('bluebird');
const moment = require('moment');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const { DB_TIMER, REF_TIMER, DB_PATH } = require('./helpers/config');

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

const readFormFile = require('./helpers/read-file');

app.listen(port, require('./lib/init')(analytics));

app.use('/', (req, res) => {
  res.end('Hi, analytics');
});

// TODO:
// return favicon
// express-generator
