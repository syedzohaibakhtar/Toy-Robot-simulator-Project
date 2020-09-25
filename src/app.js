const helper = require("./helper");
const instructions = require('./instructions.js');


const readInput = () => {
    let stdin = process.openStdin();
    let coordinate = [0, 0];
    let direction = '';
    let round = 0;

    stdin.addListener('data', function(d) {
        let command = d
            .toString()
            .trim()
            .toUpperCase();

        let isValid = instructions.isValidCommand(round, command);

        if (isValid) {
            if (instructions.isCommandTypeOf('PLACE', command)) {
                [newCoordinateX, newCoordinateY, newDirection, isValid] = instructions.execute(command);

                if (isValid) {
                    coordinate[0] = newCoordinateX;
                    coordinate[1] = newCoordinateY;
                    direction = newDirection;
                }
            } else {
                [coordinate, direction] = instructions.execute(command, coordinate, direction);
            }

            if (isValid) {
              round++;
            }
        }
    });
};

const interface = () => {
    helper.heading();
    helper.userGuide();
    readInput();
};

interface();