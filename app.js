var express = require('express');
var app = express();
var fs = require("fs");

app.set('view engine', 'jade');

//returns userlist in a table using jade

app.get('/', function (req, res) {
   fs.readFile("./users.json", 'utf8', function (err, data) {
     var items = JSON.parse(data);
     res.render('table', {items: items});
   });
});

/* returns a specified user by their id
http://localhost:3000/:id
example: http://localhost:3000/11  or you can use...
curl -X GET http://localhost:3000/:id
example: curl -X GET http://localhost:3000/21412
*/

app.get('/:id', function (req, res) {

   fs.readFile("./users.json", 'utf8', function (err, data) {

       users = JSON.parse(data);
       var user = users["user" + req.params.id]
       console.log(user);
       res.end(JSON.stringify(user));
   });
});

/* Create or change a user
curl -X PUT http://localhost:3000/set/:name/:password/:id
example: curl -X PUT http://localhost:3000/Matt/godis/2334
*/

app.put('/:name/:password/:id', function (req, res) {

   fs.readFile("./users.json", 'utf8', function (err, data) {
     var user = {
        "user" : {
           "name" : req.params.name,
           "password" : req.params.password,
           "id": req.params.id
        }
     }
       data = JSON.parse(data);
       data["user" + req.params.id] = user["user"];
       fs.writeFile("./users.json", JSON.stringify(data));
       console.log(data);
       res.end(JSON.stringify(data));
   });
});

/* deletes a user
curl -X PUT http://localhost:3000/set/:id
example: curl -X PUT http://localhost:3000/21314
*/

app.put('/:id', function (req, res) {

   fs.readFile("./users.json", 'utf8', function (err, data) {

       data = JSON.parse(data);
       delete data["user" + req.params.id];

       console.log(data);
       fs.writeFile("./users.json", JSON.stringify(data));
       res.end(JSON.stringify(data));
   });
});

/*This is the server.
to start the server use
node app.js
*/

var server = app.listen(3000, "127.0.0.1", function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("This app is running at " + host + " on port: " + port)
});
