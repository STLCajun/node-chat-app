var socket = io();
socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newEmail', function(email) {
    console.log('New email', email);
});

socket.on('newMessage', function(message) {
    console.log('New message!', message);

    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {
        console.log('Message sent');
    });
});