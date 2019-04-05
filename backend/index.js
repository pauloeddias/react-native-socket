const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('An user connected to the server');
});

var fazenda1=0;
var fazenda2=0;
var fazenda3=0;
const multiplier=10;
setInterval(() => {
  var num=  Math.random()
  num=num*multiplier;
  fazenda1=fazenda1+num;
  var date = new Date()
  io.emit('fazenda1', { data: Math.round(fazenda1), time:date.getTime()});
}, 5000);

setInterval(() => {
    var num=  Math.random()
    num=num*multiplier;
    fazenda2=fazenda2+num;
    var date = new Date()
    io.emit('fazenda2', { data: Math.round(fazenda2), time:date.getTime()});
  }, 5000);

setInterval(() => {
    var num=  Math.random()
    num=num*multiplier;
    fazenda3=fazenda3+num;
    var date = new Date()
    io.emit('fazenda3', { data: Math.round(fazenda3), time:date.getTime()});
}, 5000);

http.listen(3000, function(){
  console.log('listening on *:3000');
});