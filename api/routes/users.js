var express = require('express');
var router  = express.Router();
var db      = require('./db');
var passport = require('passport');


db.connect();


router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

router.post('/logout', function(req, res) {
  req.logOut();
  res.send(200);
});

module.exports = router;
