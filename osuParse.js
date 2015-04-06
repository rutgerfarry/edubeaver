var request = require('request');
var cheerio = require('cheerio');


// Returns a list of all the category links from the OSU course calendar
function getLinks (url, callback) {

	request(url, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var info = [];
			var $ = cheerio.load(body);
			$("td > font > a").each(function (i, element) {
				var text = $(this).text();
				var link = $(this).attr('href');
				info.push({
					'text': text,
					'link': link
				});
			});
			info.sort(function (a, b) {
				return a.text > b.text ? 1 : -1;
			});
			console.log(info);
			return info;
		}
	});
}

var links = getLinks('http://catalog.oregonstate.edu/' + 
		 			 'CourseDescription.aspx?level=undergrad.json');