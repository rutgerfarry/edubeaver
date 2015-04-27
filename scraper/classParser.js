const
  cheerio = require('cheerio');

exports.parseCourseFromHTML = parseCourseFromHTML;


function parseCourseFromHTML (htmlBody) {
  $ = cheerio.load(htmlBody);

  var course = {};

  course.title = parseTitle($);
  course.abbr = parseAbbr($);
  course.credits = parseCredits($);
  course.desc = parseDesc($);
  course.classes = parseTable($);

  return course;
}

// Gets the title from the class site
function parseTitle ($) {
  var title = $('h3').text().trim();
  title = title.replace(/(^[A-Z]{1,4}\s[0-9]{2,3})/, '');
  title = title.replace(/\(([^\)]+)\)/i, '');
  title = title.replace(/[^\w\s]/gi, '');
  title = title.replace(/\r?\n|\r|\t/g, '');
  title = title.replace(/\ {2,}/g, '');
  return title;
}

// Gets the abbreviation from the class site
function parseAbbr ($) {
  return $('h3').text().trim().match(/^[A-Z]{1,4}\s[0-9]{2,3}/)[0];
}

// Gets the credits from the class site
function parseCredits ($) {
  return $('h3').text().match(/\(([^\)]+)\)/i)[1];
}

// Gets the description from the class site
function parseDesc ($) {
  var desc = $('#aspnetForm').first()
                             .clone()
                             .children()
                             .remove()
                             .end()
                             .text()
                             .trim();
  desc = trimNewlines(desc);
  return desc;
}

// Parses the table of class meeting times
function parseTable ($) {
  var attribs = [];
  $('th').each(function (i, element) {
    var attrib = $(this).text().replace(/\r?\n|\r|\t/g, '');
    attrib = attrib.replace(/\ {2,}/g, '');
    attribs.push(attrib);
  });

  tableRows = $('#ctl00_ContentPlaceHolder1_SOCListUC1_gvOfferings > tr ');

  var classes = [];

  tableRows.each(function (i, element) {
    var classDict = {};

    td = $(this).children('td');

    td.each(function (i) {
      var data = $(this).text().replace(/\s{2,}/g, ' ').trim();
      var key = attribs[i % attribs.length];

      // Parse date
      if (key === "Day/Time/Date") {
        try {
        var info = $(this).text();
  
        classDict.M = info.indexOf('M') > -1; 
        classDict.T = info.indexOf('T') > -1;
        classDict.W = info.indexOf('W') > -1;
        classDict.R = info.indexOf('R') > -1;
        classDict.F = info.indexOf('F') > -1;

        classDict.startTime = 
          info.match(/[0-9]{4}/g)[0];
        classDict.endTime   = 
          info.match(/[0-9]{4}/g)[1];
        classDict.startDate = 
          info.match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,2}/g)[0];
        classDict.endDate   = 
          info.match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,2}/g)[1];
        }
        catch (err) {
          //console.error(err);
        }
      }
      else {
        classDict[key] = data;
      }
    });
    classes.push(classDict);
  });
  // First element will be categories, so remove it
  classes.splice(0, 1);
  return classes;
}


/////////////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////////////

function trimNewlines (desc) {
  var n = desc.indexOf('\n');
  n = n === -1 ? desc.length : n;
  return desc.substring(0, n);
}


