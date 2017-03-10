const path = require('path');
const express = require('express');
const firebase = require('firebase');
const getFirebaseMessage = require('./../helpers/firebase-error-messages');

const router = express.Router();

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../views/landing.html')));

router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../views/login.html')));

router.post('/login', (req, res) => {
  const { login, password } = req.body;
  return firebase.auth().signInWithEmailAndPassword(login, password)
    .then(() => firebase.auth().currentUser.getToken()
      .then((token) => {
        const redirect = `/dashboard/?bearer=${token}`;
        return res.json({ redirect });
      })
    )
    .catch((err) => {
      const message = getFirebaseMessage(err);
      return res.status(410).send(message);
    });
});

module.exports = router;
