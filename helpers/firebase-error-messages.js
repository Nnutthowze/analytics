const { INVALID_EMAIL, INVALID_PASSWORD } = require('./firebase-error-codes');

const firebaseStatusMessages = ({ code, message }) => {
  switch (code) {
    case INVALID_EMAIL:
    case INVALID_PASSWORD:
      return 'Invalid username and/or password provided';
    default:
      return message;
  }
};

module.exports = firebaseStatusMessages;
