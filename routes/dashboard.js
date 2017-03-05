const express = require('express');
const middleware = require('./../middleware');

const router = express.Router();

router.get('/', middleware.verifyToken, (req, res) => {
  res.end('Welcome to dashboard');
});

module.exports = router;
