var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
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

http.listen(3000,function(){
	console.log("Server listening on port 3000");
});