const express = require('express');
const middleware = require('./../middleware');
const path = require('path');

const router = express.Router();

router.get('/', middleware.verifyJWT, (req, res) => res.sendFile(path.join(__dirname, '../views/dashboard.html')));

module.exports = router;
