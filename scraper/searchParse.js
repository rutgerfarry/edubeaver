var request = require('request');
var cheerio = require('cheerio');
var path    = require('path');


var CATALOG_URL = 'http://catalog.oregonstate.edu/';
var COURSE_SEARCH_URL = CATALOG_URL + 'CourseSearcher.aspx?chr=abg';


function scrapeClassDatabase (url) {

	request(url, function parseSearchPage (error, response, body) {
		if (!error && response.statusCode === 200) {
			var classURLs = [];
			$ = cheerio.load(body);

			$("a[id^='ctl00_ContentPlaceHolder']").each(function (i, element) {
				var link = $(this).attr('href');
				classURLs.push(link);
			});
			return getCourseInfo(CATALOG_URL, classURLs);
		}
	});
}

function getCourseInfo (baseURL, classURLs) {
	var courses = [];
	var classURL = baseURL + classURLs[323];

	request(classURL, function parseClassPage (error, response, body) {
		if (!error && response.statusCode === 200) {
			$ = cheerio.load(body);

			var course = {};
			var title   = parseTitle($),
				abbr    = parseAbbr($),
				credits = parseCredits($),
				desc    = parseDesc($),
				classes = parseTable($);



			// console.log('title: ' + typeof title);
			// console.log('abbr: ' + typeof abbr);
			// console.log('credits: ' + typeof credits);
			// console.log('desc: ' + typeof desc);
			// console.log('classes: ' + typeof classes);
			console.log('title: ' + title);
			console.log('abbr: ' + abbr);
			console.log('credits: ' + credits);
			console.log('desc: ' + desc);
			console.log('classes: ' + Object.keys(classes[1]));
		}
	});
}

// Parses the table of class meeting times
function parseTable ($) {
	var attribs = [];
	$("th").each(function (i, element) {
		var attrib = $(this).text().replace(/\r?\n|\r|\t/g, '');
		attrib = attrib.replace(/\ {2,}/g, '');
		attribs.push(attrib);
	});

	tableRows = $("#ctl00_ContentPlaceHolder1_SOCListUC1_gvOfferings > tr ");

	var classes = [];

	tableRows.each(function (i, element) {
		td = $(this).children("td");

		var classDict = {};

		td.each(function (i, element) {
			var data = $(this).text().replace(/\s{2,}/g, ' ').trim();

			var key = attribs[i % attribs.length];
			classDict[key] = data;
		});
		classes.push(classDict);
	});
	// First element will be categories, so remove it
	return classes;
}

// Gets the title from the class site
function parseTitle ($) {
	var title = $("h3").text().trim();
	title = title.replace(/(^[A-Z]{1,4}\s[0-9]{2,3})/, '');
	title = title.replace(/\(([^\)]+)\)/i, '');
	title = title.replace(/[^\w\s]/gi, '');
	title = title.replace(/\r?\n|\r|\t/g, '');
	title = title.replace(/\ {2,}/g, '');
	return title;
}

// Gets the abbreviation from the class site
function parseAbbr ($) {
	return $("h3").text().trim().match(/^[A-Z]{1,4}\s[0-9]{2,3}/)[0];
}

// Gets the credits from the class site
function parseCredits ($) {
	return $("h3").text().match(/\(([^\)]+)\)/i)[1];
}

// Gets the description from the class site
function parseDesc ($) {
	var desc = $("#aspnetForm").first()
							   .clone()
							   .children()
							   .remove()
							   .end()
							   .text()
							   .trim();
	desc = trimNewlines(desc);
	return desc;
}

function trimNewlines (desc) {
	var n = desc.indexOf('\n');
	n = n === -1 ? desc.length : n;
	return desc.substring(0, n);
}

scrapeClassDatabase(COURSE_SEARCH_URL);


