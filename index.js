'use strict';

const app = require('express')();
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;

Promise.promisifyAll(fs);

app.listen(3000);

app.use('/', function(req, res) {
  fs.readFileAsync(__filename, "utf8").then((data) => {
    console.log(data);
    console.log('HOHOHO');
  })
  res.end('Hi!');
});

// TODO: 1. on app bootstrap initialize a starting object
// TODO: 2. bluebird promisify
