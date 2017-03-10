const admin = require('firebase-admin');

const verifyJWT = (req, res, next) => {
  const jwtPostRequest = req.body.token || '';
  const jwtGetRequest = req.query.bearer || '';
  const authHeader = req.headers.authorization || '';
  const [bearerName, jwtFromHead] = authHeader.split(' ');

  if ((bearerName !== 'Bearer' || !jwtFromHead) && !jwtGetRequest && !jwtPostRequest) {
    const message = 'Something went wrong... ask system administrator...';
    return res.status(410).send(message);
  }

  const jwt = (jwtGetRequest || jwtFromHead || jwtPostRequest);

  return admin.auth().verifyIdToken(jwt)
    .then((decodedToken) => {
      req.token = jwt;
      next();
    })
    .catch((err) => {
      console.error(err);
      return res.status(410).send(err.message);
    });
};

module.exports = {
  verifyJWT,
};
