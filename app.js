var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT | 3000;

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

http.listen(port,function(){
	console.log("Server listening on port " + port);
});