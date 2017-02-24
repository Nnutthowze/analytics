const app = require('express')();
const Promise = require('bluebird');
const moment = require('moment');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

const websites = {};

const init = require('./lib/init')(websites);
const { DB_TIMER, REF_TIMER } = require('./helpers/constants');

const port = process.env.PORT || 3000;

const dBpath = path.join(__dirname, '../../../local_data', 'db');

const abCampaign = {};
let referrer = {};

let timestamp = {}; // timestamp for serverStats
const serverStats = {};
// ****************************************************
// DATE: {
//     siteId: {
//         webServerName: {
//             time in minutes: {
//                 "maxCURL": "post_name/?as=799",
//                 "real": 522,
//                 "CF": 5223,
//                 "totalms": "231232",
//                 "maxCTime": "22",
//                 "avtime": "15"
//             }
//         }
//     }
// }
//
// 1. [real] - Total real server traffic, only if _timestemp is new.
// 2. [CF] - Total traffic from CF (if _timestemp is not new).
// 3. [totalms] - Total _ctime of only real server traffic.
// 4. [maxCTime] - Max value for page creation time (ms) - only for real traffic.
// 5. [maxCURL] - URL of [maxCTime].
// 6. [avtime] - Average creation time [totalms]/[real]
// *******************************************************

let isBusy = false;
// let lastUpdateDbTime = getCurrentTime().time;
// let lastUpdateRefTime = lastUpdateDbTime;

const writeToFile = require('./helpers/write-file');

app.listen(port, init);

app.use('/', (req, res) => {
  res.end('Exit');
});

// TODO:
// return favicon
// express-generator
