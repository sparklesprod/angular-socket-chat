var express = require('express');
var socketIO = require('socket.io');
var path = require('path');
var https = require('https');

const PORT = process.env.PORT || 8080;
const app = express();

setInterval(function () {
  https.get('https://annon-chat.herokuapp.com');
}, 3300000);

const server = express()
    .use(express.static(__dirname + '/dist'))
    .listen(PORT);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const io = socketIO(server);

//Clients
var clients = {};

io.on('connection', function (socket) {
   console.log('Client connected');
   io.emit('online', {type: 'online', online: io.engine.clientsCount}); /* return online users*/

  //Message
  socket.on('message', function (message) {
    var data = Object.assign(message, {date: new Date});
    // console.log("[Сервер]: ", data);
    io.emit('message', data);
  });

  //User is typing
  socket.on('typing', function (flag) {
    socket.broadcast.emit('typing', flag);
  });

   // Disconnect
   socket.on('disconnect', function () {
       console.log('Client disconnected');
       io.emit('online', {type: 'online', online: io.engine.clientsCount}); /* return online users*/
   })
});
