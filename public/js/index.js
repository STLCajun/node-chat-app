var socket = io();
var locationButton = $('#send-location');
var messageTextbox = $('[name=message]');

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
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');

   var li = $('<li></li>');
   var a = $(`<a target="_blank">My Current Location</a>`);

   li.text(`${message.from} ${formattedTime}: `);
   a.attr('href', message.url);
   li.append(a);

   $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

locationButton.on('click', function() {
   if (!navigator.geolocation) {
       return alert('Geolocation not supported by your browser');
   }

   locationButton.attr('disabled', 'disabled').text('Sending location...');


   navigator.geolocation.getCurrentPosition(function(position) {
       locationButton.removeAttr('disabled').text('Send Location');
       socket.emit('createLocationMessage', {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
       });
   }, function(err) {
       locationButton.removeAttr('disabled').text('Send Location');
       alert('Location was unable to be fetched');
   });

});