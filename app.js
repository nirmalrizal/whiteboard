var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
	console.log('a user connected');

	socket.on('mousedown', function(data){
		io.emit('mousedown', data);
	});

	socket.on('mousemove', function(data){
		io.emit('mousemove', data);
	});

	socket.on('mouseup', function(){
		io.emit('mouseup');
	});

	socket.on('mouseleave', function(){
		io.emit('mouseleave');
	});

});
