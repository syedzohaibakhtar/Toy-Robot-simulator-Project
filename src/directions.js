const status = require('./status.js');

/**
 * 
 * @param {string} shortKeys - shortcut key for North => N, South => S, East => E, West => W
 */
const getDirectionName = shortKeys => {
    switch (shortKeys) {
        case 'N':
          return 'NORTH';
        case 'S':
          return 'SOUTH';
        case 'E':
          return 'EAST';
        case 'W':
          return 'WEST';
    }
};

/**
 * 
 * @param {string} lastDirection - The latest last direction of the bot
 * @param {string} command - The command provided by user
 */
const getNewDirection = (lastDirection, command) => {
    const directions = ['N', 'E', 'S', 'W'];
    let lastDirectionIndex = directions.indexOf(lastDirection);

    switch (command) {
        case 'LEFT':
              lastDirectionIndex--;
        break;
        case 'RIGHT':
              lastDirectionIndex++;
        break;
    }

    if (lastDirectionIndex < 0) return 'W';
    if (lastDirectionIndex > 3) return 'N';

    return directions[lastDirectionIndex];
};

/**
 * 
 * @param {array} currentCoordinate - Current X & Y coordinate of the bot
 * @param {string} lastDirection - Current direction that the bot is
 */
const getNewCoordinate = (currentCoordinate, lastDirection) => {
    switch (lastDirection) {
        case 'N':
            currentCoordinate[1] = parseInt((parseInt(currentCoordinate[1]) + 1).toString());
        return currentCoordinate;
        case 'S':
            currentCoordinate[1] = parseInt((parseInt(currentCoordinate[1]) - 1).toString());
        return currentCoordinate;
        case 'W':
            currentCoordinate[0] = parseInt((parseInt(currentCoordinate[0]) - 1).toString());
        return currentCoordinate;
        case 'E':
            currentCoordinate[0] = parseInt((parseInt(currentCoordinate[0]) + 1).toString());
        return currentCoordinate;
    }
};

/**
 * 
 * @param {array} coordinate - X & Y coordinate of the bot
 */
const isValidCoordinate = coordinate => {
    const testX = parseInt(coordinate[0]) >= 0 && parseInt(coordinate[0]) < 5;
    const testY = parseInt(coordinate[1]) >= 0 && parseInt(coordinate[1]) < 5;
    if ((!testX || !testY) && process.env.NODE_ENV !== 'test') {
        status.error(`invalid coordinates [${coordinate[0]},${coordinate[1]}] please try again`);
    }
    return testX && testY;
};

/**
 * 
 * @param {string} direction  Direction (N/S/E/W) that the bot have
 */
const isValidDirection = direction => {
    const result = ['N', 'S', 'E', 'W'].indexOf(direction) !== -1;
    if (!result && process.env.NODE_ENV !== 'test') {
        status.error(`Please type valid direction: Type N for NORTH, Type S for SOUTH, Type E for EAST, Type W for WEST`);
    }
    return result;
};

module.exports = { getDirectionName, getNewDirection, getNewCoordinate, isValidCoordinate, isValidDirection };
