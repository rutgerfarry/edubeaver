var request = require('request');
var cheerio = require('cheerio');


// Returns a list of all the category links from the OSU course calendar
function getCategories (url, callback) {

	request(url, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var categories = [];
			var $ = cheerio.load(body);
			$("td > font > a").each(function (i, element) {
				var text = $(this).text();
				var link = $(this).attr('href');
				categories.push({
					'text': text,
					'link': link
				});
			});
			categories.sort(function (a, b) {
				return a.text > b.text ? 1 : -1;
			});
			callback(categories);
		}
	});
}

function getCourses (url, callback) {
	request(url, function (error, response, body) {
		if (!error && reponse.statusCode === 200) {

		}
	});
}

var url = 'http://catalog.oregonstate.edu/' + 
		  'CourseDescription.aspx?level=undergrad.json';

function parseSearch (url, callback) {

	request(url, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log(body);
		}
	});
}

parseSearch('http://catalog.oregonstate.edu/SOCSearcher.aspx?wks=&chr=abcder');