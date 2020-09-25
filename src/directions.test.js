const expect = require('expect');
const directions = require('./directions.js');

before(() => {
    process.env.NODE_ENV = 'test';
});

it('able to check if a coordinate is valid or invalid', () => {
    let wrongCoordinate = [2, 5];
    expect(directions.isValidCoordinate(wrongCoordinate)).toBeFalsy();
});

it('other than this commands N, S, E, W the direction will be invalid', () => {
    let invalidDirectionCode = 'T';
    expect(directions.isValidDirection(invalidDirectionCode)).toBeFalsy();
});

it('should be getting the correct direction full name (North, South, East, West) given a short code (N, S, E, W', () => {
    let directionCode = 'N';
    expect(directions.getDirectionName(directionCode)).toBe('NORTH');
});
