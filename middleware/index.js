const admin = require('firebase-admin');

const verifyToken = (req, res, next) => {
  console.log(req.query);
  const bearer = req.query.bearer;
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader && !bearer) {
    return res.redirect('/login');
  }

  let token = '';

  if (bearer) {
    token = bearer;
  } else {
    const authHeaderArr = authHeader.split(' ');
    const bearerName = authHeaderArr[0];
    token = authHeaderArr[1];

    if (bearerName !== 'Bearer' || !token) {
      return res.redirect('/login');
    }
  }

  return admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      console.log('DECODED!!!');
      next();
    })
    .catch((err) => {
      res.status(401).json({ message: 'Can\'t verify token' });
      console.error(err);
    });
};

module.exports = {
  verifyToken,
};
