var express = require('express');
var router = express.Router();
var db     = require('./db');


db.connect();


/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('SELECT title, abbr FROM courses', function (err, results, fields) {

    res.render('index', { 
      title: 'edubeaver',
      courses: results
    });

  });
});

router.get('/courses', function(req, res, next) {
  db.query('SELECT title, abbr FROM courses', function (err, results, fields) {
    res.json(results);
  });
});

router.get('/course/:title', function(req, res, next) {
  console.log(req.originalUrl);
  const sqlString = 'SELECT * FROM courses ' +
                    'LEFT JOIN sections ' +
                    'ON courses.id = sections.course_id ' + 
                    'WHERE courses.abbr = ?';
  db.query(sqlString, [req.params.title], function (err, results, fields) {
    if (err) {
      console.error(err);
    } else {
      // Do some fancy shit to add day names.
      // You should update this to be more pretty.
      results.forEach(function (section, index, array) {
        var days = '';
        if (section.m === 1) {
          days = days.concat('Monday, ');
        } if (section.t === 1) {
          days = days.concat('Tuesday, ');
        } if (section.w === 1) {
          days = days.concat('Wednesday, ');
        } if (section.r === 1) {
          days = days.concat('Thursday, ');
        } if (section.f === 1) {
          days = days.concat('Friday, ');
        }
        section.days = days.slice(0, -2);
      });
      res.render('course', { title: 'edubeaver - ' + results[0].abbr,
                             course: results 
      });
    }
  });
});

module.exports = router;
