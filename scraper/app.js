var searchParse = require('./searchParse');
searchParse.scrape(function scrapeComplete (courses) {
  console.log('Scrape complete. ' + courses.length + 
              ' course records obtained.');
});