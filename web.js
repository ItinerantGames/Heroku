var path = require('path');
var express = require("express");
var logfmt = require("logfmt");
var app = express();
var asyncblock = require("asyncblock");

app.use(logfmt.requestLogger());

// Serve static Unity files
app.use(express.static(path.join(__dirname, 'Unity'))); 

app.get('/', function(request, response) {

	asyncblock(function(flow) {
		var dir = spawn('ls');
		
		var result = flow.wait();
		console.log(result);

		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Spawned child process:" + result);
		response.end();
	});
  //res.send('Hello Heroku World!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});