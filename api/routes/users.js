const express = require('express');
const router  = express.Router();
const db      = require('./db');
const bcrypt  = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


db.connect();


passport.use(new LocalStrategy(
  function(username, password, done) {
    const sql = 'SELECT * FROM `users` WHERE `email` = ?';

    db.query(sql, [username], function(err, results, fields) {
      if (error) {
        return done(null, false, { message: err.code});
      }
      bcrypt.compare(password, results.password, function(err, res) {
        if (!res) {
          return done(null, false, { message: 'Incorrect password'});
        }
        else {
          var user = {
            first_name: results.first_name,
            last_name: results.last_name,
            email: results.email
          };
          console.log('login successful');
          return done(null, user);
        }
      });
    });
  }
));

router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

router.post('/signup', function(req, res) {
  const body = req.body;
  const user = {
    first_name: body.first_name,
    last_name : body.last_name,
    email     : body.email,
  };

  var credentials = user;
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(body.password, salt, function(err, hash) {
      credentials.password = hash;

      db.query('INSERT INTO users SET ?', credentials, function (err, result) {
        if (err) {
          res.status(403).json({ type: err.code });
        }
        else {
          res.status(201).json(user);
        }
      });

    });
  });

});

router.post('/logout', function(req, res) {
  req.logOut();
  res.send(200);
});

module.exports = router;