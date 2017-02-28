const express = require('express');
const app = express();
const Promise = require('bluebird');
const moment = require('moment');
const firebase = require('firebase');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const dotenv = require('dotenv').config();
const getTime = require('./helpers/time');
const bodyParser = require('body-parser');
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

// prevents some basic attacks on express framework
app.disable('x-powered-by');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.listen(port, require('./lib/init')(analytics));

app.get('/addSiteVisit/:siteId/:url/:page?', (req, res) => {
  // params appended to url after `/?` => req.query
  // params in url `:url` or `:page` => req.params
  const { siteId, url, page } = req.params;
  const tempUrl = url.replace('__x__', '');
  const tempPageUrl = typeof page !== 'undefined' ? `/${page}` : '';
  const spurl = `${tempUrl}${tempPageUrl}`;
  const tzTime = getTime();
  const currentDate = `${tzTime.year}${tzTime.month}${tzTime.day}`;

  const datePath = path.join(DB_PATH, currentDate);
  const siteIdPath = path.join(datePath, siteId);

  res.send(spurl);
});

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views/login.html')));

app.post('/login', (req, res) => {
  const { login, password } = req.body;
  firebase.auth().signInWithEmailAndPassword(login, password)
    .then(() => {
      res.redirect('/dashboard');
    })
    .catch((err) => {
      console.error(err);
      res.json({
        message: err.message,
      });
    });
});

app.get('/dashboard', (req, res) => {
  res.end('Hi, incognito!');
});

app.use('/api/hello', (req, res) => {
  res.end('Hi, Admin!');
});

// TODO:
// add login with firebase
// rebuild to Pug
// show messages about errors when userstrying to login
// add sessions
// return favicon
// express-generator
