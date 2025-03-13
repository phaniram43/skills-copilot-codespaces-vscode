//create web server
var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(req, res) {
  var path = url.parse(req.url).pathname;
  var path = path.substring(1, path.length);
  console.log(path);
  fs.readFile(path, function(err, data) {
    if (err) {
      console.log(err);
      res.writeHead(404, {"Content-Type": "text/html"});
      res.write("404 Not found");
    } else {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
    }
    res.end();
  });
});

server.listen(8080);
console.log("Server running at http://" + "localhost" + ":" + 8080 + "/");