const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const firebase = require('firebase');
const admin = require('firebase-admin');
const serviceAccount = require('./../private/firebase/serviceAccountKey');
const config = require('./../private/firebase/config');
const time = require('./../helpers/time')();
const { DB_PATH, REFERRER_FILE } = require('./../helpers/config');
const createDir = require('./../helpers/create-dir');
const readFromFile = require('./../helpers/read-file');

const init = analytics => () => {
  const currentDate = `${time.year}${time.month}${time.day}`;
  const datePath = path.join(DB_PATH, currentDate);

  const readdirErrorHandler = (err) => {
    console.error(err);
    return createDir(datePath);
  };

  const readdirHandler = (files) => {
    const filePaths = files.map(file => path.join(datePath, file));

    return Promise.map(filePaths, fileName => fs.readFileAsync(fileName).then((results) => {
      const { name } = path.parse(fileName);
      const jsonResults = JSON.parse(results);
      const siteId = String(parseInt(name, 10));
      const reference = name.includes('campaign') ? analytics.abCampaign : (name.includes('stats') ? analytics.serverStats : analytics.websites);
      reference[currentDate][siteId] = jsonResults;
    }));
  };

  const referrerErrorHandler = (err) => {
    if (err.code === 'ENOENT') {
      analytics.referrer = {};
    }
    console.error(err);
  };

  const referrerHandler = (jsonData) => {
    analytics.referrer = jsonData;
  };

  analytics.websites[currentDate] = {};
  analytics.abCampaign[currentDate] = {};
  analytics.serverStats[currentDate] = {};

  firebase.initializeApp(config);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://analytics-1c714.firebaseio.com',
  });

  return fs.readdirAsync(datePath)
    .then(readdirHandler, readdirErrorHandler)
    .then(readFromFile.bind(null, REFERRER_FILE))
    .then(referrerHandler, referrerErrorHandler)
    .catch(console.error.bind(console));
};

module.exports = init;
