var express = require('express');
var socketIO = require('socket.io');
var path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + 'dist/index.html'));
});

// const distDir = __dirname + "/dist";
const server = express()
    .use(express.static(__dirname + 'dist'))
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
