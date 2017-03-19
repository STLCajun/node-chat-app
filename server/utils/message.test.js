const expect = require('expect');
const generateMessage = require('./message');

var message = {
    from: 'tester',
    text: 'testing this out'
};

describe('generateMessage', () => {

    it ('should generate correct message object', () => {

        var res = generateMessage.generateMessage(message.from, message.text);

        expect(res.text).toBe(message.text);
        expect(res.from).toBe(message.from);
        expect(res.createdAt).toBeA('number');

    });

});