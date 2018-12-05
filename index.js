var express = require('express');
var socketIO = require('socket.io');
var path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

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
    console.log("[Сервер]: ", message);
    console.log("new Date: ", new Date);
    console.log("new Date.getTime(): ", new Date.getTime());
    io.emit('message', message);
  });

   // Disconnect
   socket.on('disconnect', function () {
       console.log('Client disconnected');
       io.emit('online', {type: 'online', online: io.engine.clientsCount}); /* return online users*/
   })
});
