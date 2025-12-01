/**
 * 
 * @param {Buffer} input 
 */
function parseInput(input) {
    let str = input.toString();
    let lines = str.split('\r\n');
    let instructions = [];
    for (let line of lines) {
        let instruction = { dir: line[0], count: parseInt(line.substring(1), 10) }
        instructions.push(instruction);
    }

    return instructions;
}

let instructions;
/**
 * 
 * @param {Buffer} input 
 */
const day1_1 = (input) => {
    let total = 0;
    let dial = 50;
    instructions = parseInput(input);
    for (let instruction of instructions) {
        switch (instruction.dir) {
            case 'L': {
                dial = dial - (instruction.count % 100);
                if (dial < 0) {
                    dial = 100 + dial;
                }
                break;
            }
            case 'R': {
                dial = dial + (instruction.count % 100);
                if (dial > 99) {
                    dial = Math.abs(100 - dial);
                }
                break;
            }
            default: {
                console.error('Invalid instruction', instruction.dir)
            }

        }
        if (dial == 0) total++;
        if (dial < 0 || dial > 99) {
            console.error('Inavlid dial location', dial);
            break;
        }
    }

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day1_2 = (input) => {
    let total = 0;
    let dial = 50;
    let previous;
    for (let instruction of instructions) {
        total += Math.floor(instruction.count / 100);
        switch (instruction.dir) {
            case 'L': {
                dial = dial - (instruction.count % 100);
                if (dial < 0) {
                    dial = 100 + dial;
                    if (dial !== 0 && previous !== 0) total++;
                }
                console.log(instruction, 'dial', dial, 'total', total);
                break;
            }
            case 'R': {
                dial = dial + (instruction.count % 100);
                if (dial > 99) {
                    dial = Math.abs(100 - dial);
                    if (dial !== 0 && previous !==0) total++;
                }
                console.log(instruction, 'dial', dial, 'total', total);
                break;
            }
            default: {
                console.error('Invalid instruction', instruction.dir, 'total', total);
            }

        }
        if (dial == 0) total++;
        previous = dial;

        if (dial < 0 || dial > 99) {
            console.error('Inavlid dial location', dial);
            break;
        }
    }

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day1 = (input) => {
    day1_1(input);
    day1_2(input);
};

module.exports = {
    day1
};
