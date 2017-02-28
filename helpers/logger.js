const debug = (process.env.APP_DEBUG === 'true');

const log = () => {
  if (debug) {
    console.log.apply(null, arguments);
  }
};

module.exports = { log };
