const moment = require('moment-timezone');

const getTime = () => {
  const tzTime = moment.tz('America/New_York');

  return {
    minutes: tzTime.format('mm'),
    hours: tzTime.format('HH'),
    day: tzTime.format('DD'),
    month: tzTime.format('MM'),
    year: tzTime.format('YYYY'),
    currentTime: tzTime.format('YYYY-MM-DD HH:mm'),
  };
};

module.exports = getTime;
