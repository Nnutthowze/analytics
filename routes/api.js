const express = require('express');
const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const moment = require('moment');
const getTime = require('./../helpers/time');
const readFromFile = require('./../helpers/read-file');
const writeToFile = require('./../helpers/write-file');
const { DB_TIMER, REF_TIMER, DB_PATH } = require('./../helpers/config');
const router = express.Router();

const removeUnnecessaryParams = ([key, value]) => key !== 'abpas' && !key.startsWith('_');
const generateQueryString = ([key, value]) => `${key}=${value}`;
const getUrlParams = query => Object.entries(query).filter(removeUnnecessaryParams).map(generateQueryString).join('&');

// router for testing purposes
router.get('/test', (req, res) => res.sendFile(path.join(__dirname, '../views/test.html')));

router.get('/pageview/:id(\\d+)/:date(^\\d{1,8}$)', (req, res) => {
  const { id, date } = req.params;
  const { year, month, day } = getTime();
  const today = `${year}${month}${day}`;

  if (date === '0') { // use current date
    const { websites } = global.analytics;
    if (!websites[today] || !websites[today][id]) {
      return res.status(404).send(`Data for siteId: ${id} not found`);
    }
    return res.status(200).json(websites[today][id]);
  }

  // not today
  const beforeToday = (date < 0) ? moment(today).add(date).format('YYYYMMDD') : date;
  const filePath = path.join(DB_PATH, beforeToday, `${id}_campaign.json`);

  return readFromFile(filePath)
    .then(data => res.status(200).json(data))
    .catch((err) => res.status(404).send('File not found'));
});

// old GET => /addSiteVisit/:siteId/:url/:page?
// new POST => /api/pageviews/:id/:page/:number?
router.patch('/pageview/:id/:page/:number?', (req, res) => {
  // params in url `:url` or `:page` => req.params
  const { id, page, number } = req.params;
  // params appended to url after `/?` => req.query
  const { abpas } = req.query;

  if (!id || !page) {
    return res.status(400).send('Bad Request');
  }

  const { year, month, day } = getTime();
  const curDate = `${year}${month}${day}`;
  const datePath = path.join(DB_PATH, curDate);
  const siteIdPath = path.join(datePath, id);

  const tmpPage = page.replace('__x__', '');
  const tmpPageNum = `/${page}` || '';
  const partUrl = `${tmpPage}${tmpPageNum}`;
  const urlParams = getUrlParams(req.query);

  const splitUrl = [partUrl, urlParams];

  // TODO: continue

  return res.status(200).send('');
});

router.get('/campaign/:id(\\d+)/:date(^\\d{1,8}$)', (req, res) => {
  // POSSIBLE VALUES for `id`:
  // 0, 1, 2, ... n, where `n` represents number of supported websites
  // POSSIBLE VALUES for `date`:
  // -Infinity ... -2, -1, 0 or 20161231,
  // WHERE:
  //       0 - current date,
  //      -1 - yesterday,
  //      -2 - day before yesterday
  const { id, date } = req.params;
  const { year, month, day } = getTime();
  const today = `${year}${month}${day}`;

  if (date === '0') { // use current date
    const { abCampaign } = global.analytics;
    if (!abCampaign[today] || !abCampaign[today][id]) {
      return res.status(404).send(`Data for siteId: ${id} not found`);
    }
    return res.status(200).json(abCampaign[today][id]);
  }
  // not today
  const beforeToday = (date < 0) ? moment(today).add(date).format('YYYYMMDD') : date;
  const filePath = path.join(DB_PATH, beforeToday, `${id}_campaign.json`);
  return readFromFile(filePath)
    .then(data => res.status(200).json(data))
    .catch((err) => res.status(404).send('File not found'));
});

router.get('/referrer/:id', (req, res) => {
  const { id } = req.params;
  const { referrer } = global.analytics;
  const data = referrer[id] || 'No Data';
  res.status(200).send(data);
});

router.patch('/referrer/:id/:name/:counter?', (req, res) => {
  const { id, name } = req.params;
  const counter = req.params.counter || 'counter';
  const { referrer } = global.analytics;
  const filePath = path.join(DB_PATH, '../referrer.json');

  if (!referrer[id]) {
    referrer[id] = {};
  }

  if (!referrer[id][name]) {
    referrer[id][name] = {};
  }

  if (!referrer[id][name][counter]) {
    referrer[id][name][counter] = 1;
  } else {
    referrer[id][name][counter] += 1;
  }

  res.status(200).send('Resource was updated successfully');

  return fs.statAsync(filePath)
    .then(({ mtime }) => {
      const { currentTime } = getTime();
      const startTime = moment(mtime, 'YYYY-MM-DD HH:mm:ss');
      const lastTime = moment(currentTime, 'YYYY-MM-DD HH:mm:ss');
      const secondsDiff = lastTime.diff(startTime, 'seconds');
      if (secondsDiff < REF_TIMER) throw new Error('The time has not passed yet...');
      return writeToFile(filePath, referrer);
    })
    .catch(err => console.error(err));
});

module.exports = router;
