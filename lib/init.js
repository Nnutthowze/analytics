const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

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

      if (name.includes('campaign')) {
        analytics.abCampaign[currentDate][siteId] = jsonResults;
      } else if (name.includes('stats')) {
        analytics.serverStats[currentDate][siteId] = jsonResults;
      } else {
        analytics.websites[currentDate][siteId] = jsonResults;
      }
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

  return fs.readdirAsync(datePath)
    .then(readdirHandler, readdirErrorHandler)
    .then(readFromFile.bind(null, REFERRER_FILE))
    .then(referrerHandler, referrerErrorHandler)
    .catch(console.error.bind(console));
};


module.exports = init;
