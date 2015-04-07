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
	var classURL = baseURL + classURLs[323];

	request(classURL, function parseClassPage (error, response, body) {
		if (!error && response.statusCode === 200) {
			$ = cheerio.load(body);
			var title   = parseTitle($),
				abbr    = parseAbbr($),
				credits = parseCredits($),
				desc    = parseDesc($);

			parseTable($);
			console.log('title: ' + title);
			console.log('abbr: ' + abbr);
			console.log('credits: ' + credits);
			console.log('desc: ' + desc);
		}
	});
}

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
	console.log(classes);
}

function parseTitle ($) {
	var title = $("h3").text().trim();
	title = title.replace(/(^[A-Z]{1,4}\s[0-9]{2,3})/, '');
	title = title.replace(/\(([^\)]+)\)/i, '');
	title = title.replace(/[^\w\s]/gi, '');
	title = title.replace(/\r?\n|\r|\t/g, '');
	title = title.replace(/\ {2,}/g, '');
	return title;
}

function parseAbbr ($) {
	return $("h3").text().trim().match(/^[A-Z]{1,4}\s[0-9]{2,3}/);
}

function parseCredits ($) {
	return $("h3").text().match(/\(([^\)]+)\)/i)[1];
}

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

getClassLinks(COURSE_SEARCH_URL, getClassInfo);
