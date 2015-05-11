const
  mysql = require('mysql'),
  async = require('async'),
  fs    = require('fs');


exports.connect      = connect;
exports.disconnect   = disconnect;
exports.query        = query;


var connection;


function connect(callback) {
  connection = mysql.createConnection({
    host           : process.env.MYSQL_PORT_3306_TCP_ADDR,
    port           : 3306,
    user           : 'root',
    password       : process.env.MYSQL_ENV_MYSQL_ROOT_PASSWORD,
    database       : 'edubeaver'
  });
}

function query(sql, res) {
  connection.query(sql, function (err, results, fields) {
    res(err, results, fields);
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
