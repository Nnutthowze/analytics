const mkdirp = require('mkdirp-bluebird');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const createDir = path => mkdirp(path, '0777')
  .then(() => fs.chownAsync(path, 1000, 1000));

module.exports = createDir;
