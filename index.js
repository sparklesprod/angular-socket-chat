var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    // res.header('Access-Control-Allow-Credentials', false);
    res.send('<h2>Hello world from Server!</h2>');
});

http.listen(8080, function () {
    console.log("listening on *:8080");
});