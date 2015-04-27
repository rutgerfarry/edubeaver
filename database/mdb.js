"use strict";

const 
  MongoClient = require('mongodb').MongoClient,
  assert      = require('assert'),
  url         = 'mongodb://localhost:27017/test';

exports.insertCourses = insertCourses;

// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   insertCourses(db, function () {
//     db.close();
//   });
// });


function insertCourses (courses, callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('courses').insertMany(courses, function () {
      db.close();
      callback();
    });
  });
}

// function insertCourse (db, course, callback) {
//   db.collection('courses').insertOne( {
//     "title"   : course.title,
//     "abbr"    : course.abbr,
//     "credits" : course.credits,
//     "desc"    : course.desc,
//     "grades" : [
//        {
//           "date" : new Date("2014-10-01T00:00:00Z"),
//           "grade" : "A",
//           "score" : 11
//        },
//        {
//           "date" : new Date("2014-01-16T00:00:00Z"),
//           "grade" : "B",
//           "score" : 17
//        }
//     ],
//     "name" : "Vella",
//     "restaurant_id" : "41704620"
//   }, function (err, result) {
//     assert.equal(err, null);
//     console.log('Inserted a document into the restaurants collection.');
//     callback(result);
//   });
// }