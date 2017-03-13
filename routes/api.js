const express = require('express');
const path = require('path');
const getTime = require('./../helpers/time');
const { DB_TIMER, REF_TIMER, DB_PATH } = require('./../helpers/config');

const router = express.Router();

const removeUnnecessaryParams = ([key, value]) => key !== 'abpas' && !key.startsWith('_');
const generateQueryString = ([key, value]) => `${key}=${value}`;
const getUrlParams = query => Object.entries(query).filter(removeUnnecessaryParams).map(generateQueryString).join('&');

// router for testing purposes
router.get('/test', (req, res) => res.sendFile(path.join(__dirname, '../views/test.html')));

// old GET => /addSiteVisit/:siteId/:url/:page?
// new POST => /api/pageviews/:id/:page/:pagenum?
router.put('/pageviews/:id/:page/:pagenum?', (req, res) => {
  // params in url `:url` or `:page` => req.params
  const { id, page, pagenum } = req.params;
  // params appended to url after `/?` => req.query
  const { abpas, _server, _ctime, _timestamp } = req.query;

  if (!id || !page || !_ctime || !_timestamp) {
    return res.status(400).send('Bad Request');
  }

  const { year, month, day } = getTime();
  const curDate = `${year}${month}${day}`;
  const datePath = path.join(DB_PATH, curDate);
  const siteIdPath = path.join(datePath, id);

  const tmpPage = page.replace('__x__', '');
  const tmpPageNum = `/${$page}` || '';
  const partUrl = `${tmpPage}${tmpPageNum}`;
  const urlParams = getUrlParams(req.query);

  const splitUrl = [partUrl, urlParams];

  // TODO: continue

  return res.status(200).send('');
});

router.get('/referrer/:id', (req, res) => {
  const { id } = req.params;
  const { referrer } = global.analytics;
  const data = referrer[id] || 'No Data';
  res.status(200).send(data);
});

module.exports = router;
