const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const readFromFile = path => fs.readFileAsync(path, 'utf8');

module.exports = readFromFile;
