var express = require('express');
// var io = require('socket.io')();

var app = express();
var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
    res.send('<h2>Hello world from Server!</h2>');
});

app.listen(port, function () {
   console.log('app is running on port: ' + port);
});