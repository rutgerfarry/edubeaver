var express = require('express');
var router = express.Router();
var db     = require('./db');


db.connect();


////////////////////////////////////////////////////////////////////
// API    API    API    API    API    API    API    API    API    //
////////////////////////////////////////////////////////////////////

router.get('/courses', function(req, res, next) {
  db.query('SELECT title, abbr FROM courses', function (err, results, fields) {
    res.json(results);
  });
});

router.get('/courses/:abbr', function(req, res, next) {
  const sqlString = 'SELECT * FROM courses ' +
                    'LEFT JOIN sections ' +
                    'ON courses.id = sections.course_id ' + 
                    'WHERE courses.abbr = ?';
  db.query(sqlString, [req.params.abbr], function(err, results, fields) {
    console.log(results);

    var jsonResponse = {
      title: results[0].title,
      abbr: results[0].abbr,
      credits: results[0].credits,
      description: results[0].description,
      sections: [ ]
    };

    results.forEach(function (section, index, array) {
      var days = '';
      if (section.m === 1) { days = days.concat('M'); } 
      if (section.t === 1) { days = days.concat('T'); } 
      if (section.w === 1) { days = days.concat('W'); } 
      if (section.r === 1) { days = days.concat('R'); } 
      if (section.f === 1) { days = days.concat('F'); }

      jsonResponse.sections[index] = {
        term: section.term,
        start_date: section.start_date,
        end_date: section.end_date,
        session: section.session,
        crn: section.crn,
        section_number: section.sec,
        credits: section.credits,
        instructor: section.instructor,
        days: days,
        start_time: section.start_time,
        end_time: section.end_time,
        location: section.location,
        campus: section.campus,
        type: section.type,
        status: section.status,
        cap: section.cap,
        enrolled: section.enrolled,
        waitlist_cap: section.wl_cap,
        waitlist_current: section.wl_current,
        fees: section.fees,
        restrictions: section.restrictions,
        comments: section.comments
      };
    });
  res.json(jsonResponse);
  });
});



////////////////////////////////////////////////////////////////////
// LEGACY    LEGACY    LEGACY    LEGACY    LEGACY    LEGACY       //
////////////////////////////////////////////////////////////////////

router.get('/', function(req, res, next) {
  db.query('SELECT title, abbr FROM courses', function (err, results, fields) {

    res.render('index', { 
      title: 'edubeaver',
      courses: results
    });

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
