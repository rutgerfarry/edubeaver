var request = require('request');
var cheerio = require('cheerio');
var path    = require('path');


var CATALOG_URL = 'http://catalog.oregonstate.edu/';
var COURSE_SEARCH_URL = CATALOG_URL + 'CourseSearcher.aspx?chr=abg';
var COURSE_ATTRIBS = ['term', 'crn', 'sec', 'cr', 'pn', 'instructor', 'time', 
					  'location', 'campus', 'fye', 'type', 'status', 'cap', 
					  'curr', 'avail', 'wl-cap', 'wl-curr', 'wl-avail', 
					  'section-title', 'fees', 'restrictions'];

function getClassLinks (url) {

	request(url, function parseSearchPage (error, response, body) {
		if (!error && response.statusCode === 200) {
			var classURLs = [];
			$ = cheerio.load(body);

			$("a[id^='ctl00_ContentPlaceHolder']").each(function (i, element) {
				var link = $(this).attr('href');
				classURLs.push(link);
			});
			getClassInfo(CATALOG_URL, classURLs);
		}
	});
}

function getClassInfo (baseURL, classURLs) {
	var classURL = baseURL + classURLs[320];

	request(classURL, function parseClassPage (error, response, body) {
		if (!error && response.statusCode === 200) {
			$ = cheerio.load(body);
			var name = $("h3").text().trim();
			var desc = $("#aspnetForm").first()
									   .clone()
									   .children()
									   .remove()
									   .end()
									   .text()
									   .trim();
			desc = trimNewlines(desc);
			var abbr = name.match(/^[A-Z]{1,4}\s[0-9]{2,3}/);
			var credits = name.match(/\(([^\)]+)\)/i)[1];

			name = name.replace(/(^[A-Z]{1,4}\s[0-9]{2,3})/, '');
			name = name.replace(/\(([^\)]+)\)/i, '');
			name = name.replace(/[^\w\s]/gi, '');
			name = name.replace(/\r?\n|\r|\t/g, '');
			name = name.replace(/\ {2,}/g, '');


			var table = $("#ctl00_ContentPlaceHolder1_SOCListUC1_gvOfferings");
			console.log('title: ' + name);
			console.log('abbr: ' + abbr);
			console.log('credits: ' + credits);
			console.log('desc: ' + desc);
		}
	});
}

function trimNewlines (desc) {
	var n = desc.indexOf('\n');
	n = n === -1 ? desc.length : n;
	return desc.substring(0, n);
}

getClassLinks(COURSE_SEARCH_URL, getClassInfo);

//getClassInfo('google.com', '/hello');

//'/CourseDetail.aspx?subjectcode=MTH&coursenumber=254&campus=corvallis'
