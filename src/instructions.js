const directions = require('./directions.js');
const status = require('./status.js');

const isInvalidFirstCommandPattern = (round, command) => {
    return round === 0 && /PLACE\s\S{5}/.test(command) === false;
};

const isInvalidCommandPattern = command => {
    return /PLACE\s\S{5}|MOVE|LEFT|RIGHT|REPORT/.test(command) === false;
};

const isCommandTypeOf = (type, command) => {
    switch (type) {
        case 'PLACE':
            return /PLACE\s\S{5}/.test(command);
        default:
            return type === command;
    }
};

const isValidCommand = (round, command) => {
    let isValid = true;

    if (isInvalidFirstCommandPattern(round, command)) {
        if (process.env.NODE_ENV !== 'test') {
            status.error('The first command should be "PLACE <x-coordinate>,<y-coordinate>,<direction>"');
        }
        isValid = false;
    } else if (isInvalidCommandPattern(command)) {
        if (process.env.NODE_ENV !== 'test') {
            status.error('Please enter a valid command: PLACE, MOVE, LEFT, RIGHT, REPORT');
        }
        isValid = false;
    }

    return isValid;
};

const execute = (command, coordinate = null, direction = null) => {
    switch (true) {
        case /PLACE\s\S{5}/.test(command):
            let subCommand = command.split(' ')[1]; 
            let breakdownSubCommand = subCommand.split(',');
            let newXCoordinate = breakdownSubCommand[0];
            let newYCoordinate = breakdownSubCommand[1];
            let newDirection = breakdownSubCommand[2];
            let isValid = directions.isValidCoordinate([newXCoordinate, newYCoordinate]) && directions.isValidDirection(newDirection);

        return [parseInt(newXCoordinate), parseInt(newYCoordinate), newDirection, isValid];
        case command === 'MOVE':
            let tempCoordinate = coordinate.slice(0);
            let computedCoordinate = directions.getNewCoordinate(tempCoordinate, direction);
            let isValidCoordinate = directions.isValidCoordinate(computedCoordinate);
            if (isValidCoordinate) {
              coordinate = computedCoordinate;
            }
        break;
        case command === 'LEFT':
            direction = directions.getNewDirection(direction, command);
        break;
        case command === 'RIGHT':
            direction = directions.getNewDirection(direction, command);
        break;
        case command === 'REPORT':
            let result = coordinate[0] + ',' + coordinate[1] + ',' + directions.getDirectionName(direction);
            if (process.env.NODE_ENV !== 'test') {
              status.success(`\nCurrent position of the toy robot: ${result}\n`);
              status.information('You may now resume typing other commands below:\n');
            } else {
              return result;
            }
    }

    return [coordinate, direction];
};

module.exports = { isInvalidFirstCommandPattern, isInvalidCommandPattern, isCommandTypeOf, isValidCommand, execute };
