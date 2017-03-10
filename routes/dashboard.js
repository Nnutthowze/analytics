const express = require('express');
const middleware = require('./../middleware');
const path = require('path');

const router = express.Router();

router.get('/', middleware.verifyJWT, (req, res) => {
  if (!req.token) {
    const message = "Can't set token";
    return res.status(401).send(message);
  }
  return res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

module.exports = router;
