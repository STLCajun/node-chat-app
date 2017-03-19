var socket = io();
socket.on('connect', function() {
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: 'luthermac@gmail.com',
    //     text: 'This is just a text'
    // });
    //
    // socket.emit('createMessage', {
    //     to: 'Luther',
    //     text: 'This is just a text'
    // });
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newEmail', function(email) {
    console.log('New email', email);
});

socket.on('newMessage', function(message) {
    console.log('New message', message);
});