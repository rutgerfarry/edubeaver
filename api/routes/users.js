const 
  express = require('express'),
  router  = express.Router(),
  db      = require('./db'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').strategy;


db.connect();


// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     const 
//       saltSql = 'SELECT `salt` FROM `users` WHERE `username` = ?',
//       userSql = 'SELECT * FROM `users` WHERE `username` = ? AND `password` = ?';

//     db.query(saltSql, [username], function(error, results, fields) {
//       if (error) {
//         throw error;
//       }
//     });
//   })
// );

router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

router.post('/', function(req, res) {
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.password);
});

router.post('/logout', function(req, res) {
  req.logOut();
  res.send(200);
});

module.exports = router;