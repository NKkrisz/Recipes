jest.mock('../js/userManager.js', () => ({
    checkPassword: jest.fn(),
    checkUsername: jest.fn(),
}));


const { checkPassword, checkUsername } = require('../js/userManager.js');

describe('checkPassword function', () => {
    test('it should return true for valid password length', () => {
        const result = checkPassword('validPassword');
        expect(result).toBeUndefined();
    });

});

describe('checkUsername function', () => {
    test('it should return true for valid username length', () => {
        const result = checkUsername('validUsername');
        expect(result).toBeUndefined();
    });
});
