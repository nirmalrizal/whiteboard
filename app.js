var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT | 3000;

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
io.use(function () {  
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
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

http.listen(port,function(){
	console.log("Server listening on port " + port);
});