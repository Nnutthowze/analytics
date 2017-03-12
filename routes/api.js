const express = require('express');
const path = require('path');
const { DB_PATH } = require('./../helpers/config');

const router = express.Router();

// router for testing purposes
router.get('/test', (req, res) => res.sendFile(path.join(__dirname, '../views/test.html')));

// old GET => /addSiteVisit/:siteId/:url/:page?
// new POST => /api/pageviews
router.put('/pageviews', (req, res) => {
  // params appended to url after `/?` => req.query
  // params in url `:url` or `:page` => req.params
  const { id, page, pagenum, as, bdk, abpas, _server, _ctime, _timestamp } = req.query;
  if (!id || !page || !_ctime || !_timestamp) {
    return res.status(400).send('Bad Request');
  }
  // const tempUrl = page.replace('__x__', '/');
  const tempPageUrl = `/${page}` || '';
  const spurl = `${tempUrl}${tempPageUrl}`;
  const tzTime = getTime();
  const currentDate = `${tzTime.year}${tzTime.month}${tzTime.day}`;

  const datePath = path.join(DB_PATH, currentDate);
  const siteIdPath = path.join(datePath, id);

  return res.status(200).send(spurl);
});

module.exports = router;
