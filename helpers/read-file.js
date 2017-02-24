const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const readFromFile = (path, obj) =>
  fs.readFileAsync(path, 'utf8')
    .then((data) => {
      obj = JSON.parse(data);
    })
    .catch(err => console.error(err));

module.exports = readFromFile;
