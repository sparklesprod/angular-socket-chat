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
   console.log('Socket', socket.id);
   console.log('All users', io.engine.clientsCount);

   // Disconnect
   socket.on('disconnect', function () {
       console.log('Client disconnected');
   })
});
