var path = require('path');
var express = require("express");
var logfmt = require("logfmt");
var child_process = require("child_process");
var app = express();

app.use(logfmt.requestLogger());

// Serve static Unity files
app.use(express.static(path.join(__dirname, 'Unity'))); 

app.get('/', function(request, response) {

	child_process.exec('git log --pretty=format:"<entry><author>%an</author><commit_date>%cd</commit_date><message_body>%b</message_body></entry>" Unity/Heroku.html', function(error, stdout, stderr) {
		console.log("Log: " + error + " " + stdout + " " + stderr);
		response.send(stdout);
	});
  //res.send('Hello Heroku World!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});