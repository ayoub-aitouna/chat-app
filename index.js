var express = require('express');
var socket = require('socket.io');
//App setup
var app = express();
var server = app.listen(3000, () => {
    console.log('lisetining on request at port 3000');
});

//statice file
app.use(express.static('public'));
//socket setup
var io = socket(server);

io.on('connection', function(socket) {
    console.log('made socket connection' + socket.id);
    socket.on('chat', (data) => {
        console.log(data);
        io.sockets.emit('chat', data);
    });
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
    socket.on('done', () => {
        socket.broadcast.emit('done');
    })

})