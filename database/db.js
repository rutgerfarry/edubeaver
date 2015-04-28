const 
  mysql = require('mysql'),
  fs = require('fs');

exports.connect      = connect;
exports.disconnect   = disconnect;
exports.insertCourse = insertCourse;


var connection;


function connect(callback) {
  var config;
  fs.readFile('../conf/config.json', 'utf8', function (err, data) {
    if (err) {
      console.err('Could not log into database: config file not found');
    } else {
      config = JSON.parse(data);
    }

    connection = mysql.createConnection({
      host         : config.db.host,
      user         : config.db.user,
      password     : config.db.password,
      socketPath   : config.db.socket,
      database     : config.db.database
    });
    connection.connect();
  });
}

function insertCourse (course, callback) {
  const 
    courseSQL = 'INSERT INTO courses SET ?',
    sectionSQL;

  var courseSet = {
    title       : course.title,
    abbr        : course.abbr,
    credits     : course.credits,
    description : course.desc
  };

  connection.query(courseSQL, courseSet, function () {
    console.log('Insertus successfullus');
  })
}

function disconnect() {
  connection.end();
  console.log('Disconnected from DB')
}


