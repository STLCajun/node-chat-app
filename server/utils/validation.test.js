const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {

    it ('should reject non string', () => {
        var string = 1234;
        expect(isRealString(string)).toBe(false);
    });

    it ('should reject strings with only spaces', () => {
        var string = '    ';
        expect(isRealString(string)).toBe(false);
    });

    it ('should allow string with non space characters', () => {
        var string = '  super  awesome';
        expect(isRealString(string)).toBe(true);
    });

});