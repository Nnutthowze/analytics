const path = require('path');

const DB_TIMER = 30000; // represents 30 seconds equals 30000 (30 * 1000) milliseconds
const REF_TIMER = 60; // represents 60 seconds
const DB_PATH = path.join(__dirname, '../../../local_data/db');
const REFERRER_FILE = path.join(DB_PATH, '../referrer.json');

module.exports = {
  DB_TIMER,
  REF_TIMER,
  DB_PATH,
  REFERRER_FILE,
};
