const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('createEmail', (newEmail) => {
        console.log('Created Email', newEmail);
    });

    socket.on('createMessage', (message) => {
        console.log('Created Message', message);
        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))
    });

    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });
});


server.listen(port, () => {
 console.log(`Server is up on port ${port}`);
});





