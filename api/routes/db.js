const
  mysql = require('mysql'),
  async = require('async'),
  fs    = require('fs');


exports.connect      = connect;
exports.disconnect   = disconnect;
exports.query        = query;


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
      host           : config.db.host,
      port           : 3306,
      user           : config.db.user,
      password       : config.db.password,
      database       : config.db.database
    });
  });
}

function query(sqlString, values, callback) {
  connection.query(sqlString, values, callback);
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
