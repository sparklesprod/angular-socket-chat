var express = require('express');
var socketIO = require('socket.io');

const PORT = process.env.PORT || 8080;
const server = express()
    .use(function (req, res) {
        res.send('<h2>Hello world from Server!</h2>');
    })
    .listen(PORT, function () {
        console.log('app is running on port: ' + PORT);
    })
;

const io = socketIO(server);

io.on('connection', function (socket) {
   console.log('Client connected');

   // Disconnect
   socket.on('disconnect', function () {
       console.log('Client disconnected');
   })
});