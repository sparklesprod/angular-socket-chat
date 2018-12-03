var express = require('express');
// var socketIO = require('socket.io');
var path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname + 'dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + 'dist/index.html'));
});

app.set('port', PORT);

// const distDir = __dirname + "/dist";
// const server = express()
//     .use(function (req, res) {
//         res.send('<h2>Hello world from Server222 TEst!</h2>');
//     })
//     .listen(PORT, function () {
//         console.log('app is running on port: ' + PORT);
//     })
// ;
//
const io = socketIO(app);

io.on('connection', function (socket) {
   console.log('Client connected');

   // Disconnect
   socket.on('disconnect', function () {
       console.log('Client disconnected');
   })
});
