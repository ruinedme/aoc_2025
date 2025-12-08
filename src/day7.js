const { Grid } = require('./utils/grid');

const SPLITTER = '^'.charCodeAt(0);
const LASER = '|'.charCodeAt(0);
const EMPTY = '.'.charCodeAt(0);

/**
 * 
 * @param {Buffer} input 
 */
const day7_1 = (input) => {
    let total = 0;
    const grid = new Grid(input);
    const beams = [];
    const forks = [];
    beams.push(grid.grid.indexOf('S'));
    const start = beams[0];

    while (beams.length > 0) {
        const index = beams.length - 1;
        let beam = beams[index];

        // Already traversed this path
        if (forks.includes(beam)) {
            beams.pop();
            continue;
        }
        grid.grid[beam] = LASER;
        const { row, col } = grid.getRowCol(beam);

        // Beam has exited the grid
        if (row + 1 === grid.height) {
            const done = beams.pop();
            continue;
        }

        // Beam has split
        const nextRow = grid.getIndex(row + 1, col);
        if (grid.grid[nextRow] === SPLITTER) {
            const b = beams.pop();
            if (!forks.includes(b)) {
                forks.push(b);
            }
            // Need to worry about left/right edge grid?
            // Looks like there is a 1 column gap on both sides, and whole bottom row is empty
            beams.push(nextRow - 1); // left
            beams.push(nextRow + 1); // right
            continue;
        }

        // beam continues down
        beams[index] = nextRow;
    }

    grid.grid[start] = 'S'.charCodeAt(0);
    total = forks.length;
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day7_2 = (input) => {
    let total = 0;

    // The structure of the beams is simialar to pascal's triangle
    //          1       .......|........
    //         1 1      ......|^|.......
    //        1 2 1     .....|^|^|......
    //       1 3 3 1    ....|^|^|^|.....
    //      1 4 3 1 1   ...|^|^|||^|.... // This is where it deviates
    //           3         1 4 331 1
    //                          ^ This 3 is carried down from the previous row
    // Except there are some gaps, not every splitter causes beams to overlap
    // And in certain cases some splitters are never hit by a beam directly
    // From the start point bing the laser down to the next row
    // From every splitter on each row check if there is a laser above it
    // If there is a laser above the splitter make 2 new lasers to the left and right of the splitter
    // How to preserve the counts of the inner numbers between rows?
    let lines = input.toString().split('\r\n');
    const start = lines[0].indexOf('S');

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day7 = (input) => {
    day7_1(input);
    day7_2(input);
};

module.exports = {
    day7
};
