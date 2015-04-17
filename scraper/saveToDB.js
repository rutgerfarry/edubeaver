var mysql = require('mysql');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;


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

	});
}