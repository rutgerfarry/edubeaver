var mysql = require('mysql');
var fs = require('fs');

exports.connect = connectToDB;
exports.insert  = insert;

function insertCourseArray (courseArray) {
	connectToDB();
}

function connectToDB(callback) {
	var config;
	fs.readFile('../conf/config.json', 'utf8', function (err, data) {
		if (err) {
			console.err('Could not log into database: config file not found');
		} else {
			config = JSON.parse(data);
		}

		var connection = mysql.createConnection({
			host     : config.db.host,
			user     : config.db.user,
			password : config.db.password,
			database : config.db.database
		});
		connection.connect();

		callback(connection);
	});
}

