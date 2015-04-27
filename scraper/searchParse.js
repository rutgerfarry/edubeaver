const 
  request      = require('request'),
  cheerio      = require('cheerio'),
  async        = require('async'),
  classParser  = require('./classParser');


const
  CATALOG_URL = 'http://catalog.oregonstate.edu/',
  COURSE_SEARCH_URL = CATALOG_URL + 'CourseSearcher.aspx?chr=abg';


exports.scrape = getCourseLinks;


/////////////////////////////////////////////////
// MAIN FUNCTIONS
/////////////////////////////////////////////////

function getCourseLinks (callback) {

  request(COURSE_SEARCH_URL, function parseSearchPage (err, res, body) {
    if (!err && res.statusCode === 200) {
      var classURLs = [];
      $ = cheerio.load(body);

      $("a[id^='ctl00_ContentPlaceHolder']").each(function (i, element) {
        var link = $(this).attr('href');
        classURLs.push(link);
      });
      // First two elements are currently trash, don't attempt to scrape
      classURLs.splice(0, 2);
      return getCourseInfo(CATALOG_URL, classURLs, callback);
    }
  });
}

function getCourseInfo (baseURL, classURLs, callback) {
  var courses = [];
  var index = 1;

  async.each(classURLs.slice(0, 15), function (url, asyncCallback) {

    var classURL = baseURL + url;
    console.log('Scraping ' + index++ + ' of ' + classURLs.length);
    console.log('URL: ' + classURL);

    request(classURL, function scrapeClassPage (error, response, body) {
      if (!error && response.statusCode === 200) {
        var course = classParser.parseCourseFromHTML(body);
        courses.push(course);
        asyncCallback();
      }
    });
  }, function (error) {
    if (error) {
      console.err('An error occured: ' + error);
    } else {
      callback(courses);
    }
  });
}


