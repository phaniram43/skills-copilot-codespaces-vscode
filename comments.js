//Create web server
var express = require('express');
var app = express();
var fs = require("fs");

//Get comments
app.get('/getComments', function (req, res) {
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

//Add comments
app.get('/addComments', function (req, res) {
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data.push(req.query);
       console.log(data);
       fs.writeFile( __dirname + "/" + "comments.json", JSON.stringify(data), function (err) {
           if (err) {
               console.log(err);
           } else {
               console.log("The file was saved!");
               res.end(JSON.stringify(data));
           }
       });
   });
})

//Delete comments
app.get('/deleteComments', function (req, res) {
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data.splice(req.query.index, 1);
       console.log(data);
       fs.writeFile( __dirname + "/" + "comments.json", JSON.stringify(data), function (err) {
           if (err) {
               console.log(err);
           } else {
               console.log("The file was saved!");
               res.end(JSON.stringify(data));
           }
       });
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Server started at http://%s:%s", host, port)
})