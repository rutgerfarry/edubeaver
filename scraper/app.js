const 
  fs          = require('fs'),
  searchParse = require('./searchParse'),
  database    = require('../database/mdb.js');


searchParse.scrape(function scrapeComplete (courses) {
  console.log('Scrape complete. ' + courses.length + 
              ' course records obtained.');

  database.insertCourses(courses, function () {
    console.log('Courses inserted');
  });
});



function writeToFile(filename, courses) {
    fs.writeFile(filename, JSON.stringify(courses), function (err) {
    if (err) {
      console.err("Error saving to file!" + err);
    }
  });
}


