const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const writeToFile = (path, data) => {
  const stringifyData = JSON.stringify(data);
  return fs.writeFileAsync(path, stringifyData);
};

module.exports = writeToFile;
