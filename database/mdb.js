"use strict";

const 
  MongoClient = require('mongodb').MongoClient,
  assert      = require('assert'),
  url         = 'mongodb://localhost:27017/test';

exports.insertCourses = insertCourses;


function insertCourses (courses, callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('courses').insertMany(courses, function () {
      db.close();
      callback();
    });
  });
}