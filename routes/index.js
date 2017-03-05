const path = require('path');
const express = require('express');
const firebase = require('firebase');

const router = express.Router();

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../views/landing.html')));

router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../views/login.html')));

router.post('/login', (req, res) => {
  const { login, password } = req.body;
  return firebase.auth().signInWithEmailAndPassword(login, password)
    .then(() => {
      return firebase.auth().currentUser.getToken()
        .then((idToken) => {
          // console.log(idToken);
          // res.header('Authorization', `Bearer ${idToken}`);
          // res.redirect('/dashboard');
          res.status(200).json({ token: idToken });
          // res.redirect('/dashboard');
        });
    })
    .catch((err) => {
      console.error(err);
      // res.json({
      //   message: err.message,
      // });
      res.end(err);
    });
});

module.exports = router;
