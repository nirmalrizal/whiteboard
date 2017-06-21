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

io.sockets.on('connection',function(socket){
	console.log('a user connected');
	var username = 'Anonymous User';
	socket.on('add user',function(user){
		username = user;
	});
	socket.on('chat message', function(tempMsg){
		var msg = username + ' : ' + tempMsg;
		io.emit('chat message', msg);
	});
});
