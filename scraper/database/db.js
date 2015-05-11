const 
  mysql = require('mysql'),
  async = require('async'),
  fs    = require('fs');


exports.connect      = connect;
exports.disconnect   = disconnect;
exports.insertCourse = insertCourse;


var connection;


function connect(callback) {
  var config;
  fs.readFile('../../config.json', 'utf8', function (error, data) {
    if (error) {
      console.error('Could not log into database: config file not found');
    } else {
      config = JSON.parse(data);
    }

    connection = mysql.createConnection({
      host           : process.env.MYSQL_PORT_3306_TCP_ADDR,
      port           : 3306,
      user           : config.db.user,
      password       : process.env.MYSQL_ENV_MYSQL_ROOT_PASSWORD,
      database       : config.db.database
    });
  });
}

function insertCourse (course, callback) {
  const sql = 'INSERT INTO courses SET ?';

  const courseData = {
    title       : course.title,
    abbr        : course.abbr,
    credits     : course.credits,
    description : course.desc
  };

  // Get id of inserted course, use it to associate sections with that course
  connection.query(sql, courseData, function (err) {
    if (err) {
      callback(err);
    }
    connection.query('SELECT LAST_INSERT_ID()', function(err, id) {
      if (err) {
        callback(err);
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

  console.log(section);

  var
    startDate = null,
    endDate   = null;


  if (section.startdate && section.enddate) {
    var 
      sdArr = section.startdate.split('/'),
      edArr = section.enddate.split('/');
      
    startDate = new Date('20' + sdArr[2], sdArr[0] - 1, sdArr[1]);
    endDate   = new Date('20' + edArr[2], edArr[0] - 1, edArr[1]);
  }
  
  console.log('================  DB  ================');

  const sectionData = {
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
    start_date      : startDate,
    end_date        : endDate,
    start_time      : section.starttime,
    end_time        : section.endtime,
    location        : section.location,
    campus          : section.campus,
    type            : section.type,
    status          : section.status,
    cap             : section.cap,
    enrolled        : section.curr,
    wl_cap          : section.wlcap,
    wl_current      : section.wlcurr,
    fees            : section.fees,
    restrictions    : section.restrictions,
    comments        : section.comments
  };

  console.log(sectionData);

  connection.query(sql, sectionData, function (err, res) {
    if (err) {
      asyncCallback(err + sectionData.courseId);
    } else {
      asyncCallback();
    }
  });
}

function disconnect() {
  connection.end(function (error) {
    if (error) {
      console.error('Error disconnecting from MySQL server: ' + error);
    } else {
      console.log('Disconnected from DB');
    }
  });
}


