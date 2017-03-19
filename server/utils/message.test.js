const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

var message = {
    from: 'tester',
    text: 'testing this out'
};

var location = {
    latitude: '75.12345',
    longitude: '38.12345'
};

describe('generateMessage', () => {

    it ('should generate correct message object', () => {

        var res = generateMessage(message.from, message.text);
        var from = message.from;
        var text = message.text;

        expect(res).toInclude({from, text});
        expect(res.createdAt).toBeA('number');

    });

});

describe('generateLocationMessage', () => {

    it ('should generate correct message location object', () => {
        var res = generateLocationMessage(message.from, location.latitude, location.longitude);
        var url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
        var from = message.from;

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from, url});

    });

});