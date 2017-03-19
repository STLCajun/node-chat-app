const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Administrator',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Administrator',
        text: 'New User has Joined',
        createdAt: new Date().getTime()
    });

    socket.on('createEmail', (newEmail) => {
        console.log('Created Email', newEmail);
    });

    socket.on('createMessage', (newMessage) => {
        console.log('Created Message', newMessage);


        // io.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
        socket.broadcast.emit('newMessage', {
           from: newMessage.from,
           text: newMessage.text,
           createdAt: new Date().getTime()
        })
    });

    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });
});


server.listen(port, () => {
 console.log(`Server is up on port ${port}`);
});





