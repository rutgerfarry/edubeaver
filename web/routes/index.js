var express = require('express');
var router = express.Router();
var db     = require('./db');


db.connect();


/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('SELECT title FROM courses', function (err, results, fields) {

  	res.render('index', { 
  		title: 'coursesauce',
  		courseTitles: results.map(function(value) {
  			return value.title;
		}) 
	});

  });
});

module.exports = router;
