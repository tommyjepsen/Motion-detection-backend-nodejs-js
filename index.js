var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var visitors = 0;

app.get('/', function(req, res){
	res.sendfile('index.html');
});

io.on('connection', function(socket){
 	console.log('a user connected');
	socket.on('disconnect', function(){
       console.log('user disconnected');
 	});


	socket.on('visitor', function(msg){
		console.log("THERE IS A VISITOR HERE " + msg);

		visitors++;

		io.emit('visitorWeb', visitors);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

