const
	db = require('./db');

db.connect(function () {
  console.log('CONeneCted');
  db.disconnect();
})