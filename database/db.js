const 
  mysql = require('mysql'),
  async = require('async'),
  fs    = require('fs');


exports.connect      = connect;
exports.disconnect   = disconnect;
exports.insertCourse = insertCourse;


var pool;


function connect(callback) {
  var config;
  fs.readFile('../conf/config.json', 'utf8', function (error, data) {
    if (error) {
      console.error('Could not log into database: config file not found');
    } else {
      config = JSON.parse(data);
    }

    pool = mysql.createPool({
      connectionLimit: 5,
      host           : config.db.host,
      user           : config.db.user,
      password       : config.db.password,
      socketPath     : config.db.socket,
      database       : config.db.database
    });
  });
}

function insertCourse (course, callback) {
  const sql = 'INSERT INTO courses SET ?';

  var courseData = {
    title       : course.title,
    abbr        : course.abbr,
    credits     : course.credits,
    description : course.desc
  };

  // Get id of inserted course, use it to associate sections with that course
  pool.query(sql, courseData, function (err) {
    if (err) {
      throw err;
    }
    pool.query('SELECT LAST_INSERT_ID()', function(err, id) {
      if (err) {
        throw err;
      }
      insertSections(course, id, function (err) {
        if (err) {
          callback(err);
        }
        callback();
      });
    });
  });
}

function insertSections(course, id, callback) {
  async.eachSeries(course.sections, insertSection.bind(id), function (err) {
    if (err) {
      callback(err);
    }
    callback();
  });
}

function insertSection (section, asyncCallback) {
  const 
    sql = 'INSERT INTO sections SET ?',
    id  = this[0]['LAST_INSERT_ID()'];

    asyncCallback();

  var sectionData = {
    course_id       : id,
    term            : section.term,
    crn             : section.crn,
    sec             : section.sec,
    credits         : section.cr,
    instructor      : section.instructor,
    m               : section.m,
    t               : section.t,
    w               : section.w,
    r               : section.r,
    f               : section.f,
    start_date      : section.startdate,
    end_date        : section.enddate,
    start_time      : section.starttime,
    end_time        : section.endtime,
    location        : section.location,
    campus          : section.campus,
    cap             : section.cap,
    enrolled        : section.curr,
    wl_cap          : section.wlcap,
    wl_current      : section.wlcurr,
    fees            : section.fees,
    restrictions    : section.restrictions,
    comments        : section.comments
  };

  pool.query(sql, sectionData, function (err, res) {
    if (err) {
      asyncCallback(err);
    } else {
      asyncCallback();
    }
  });
}

function disconnect() {
  pool.end(function (error) {
    if (error) {
      console.error('Error disconnecting from MySQL server: ' + error);
    } else {
      console.log('Successfully disconnected from DB');
    }
  });
}


