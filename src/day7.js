const { Grid } = require('./utils/grid');

const SPLITTER = '^'.charCodeAt(0);
const LASER = '|'.charCodeAt(0);
/**
 * 
 * @param {Buffer} input 
 */
const day7_1 = (input) => {
    let total = 0;
    const grid = new Grid(input);
    const beams = [];
    const usedSpaces = [];
    beams.push(grid.grid.indexOf('S'));

    // let iters = 0;
    while (beams.length > 0) {
        // iters++;
        const index = beams.length - 1;
        let beam = beams[index];

        // Already traversed this path
        if(usedSpaces.includes(beam)){
            beams.pop();
            continue;
        }
        grid.grid[beam] = LASER;
        const { row, col } = grid.getRowCol(beam);

        // Beam has exited the grid
        if (row + 1 === grid.height) {
            const done = beams.pop();
            // console.log('finished beaam', done);
            continue;
        }

        // Beam has split
        const nextRow = grid.getIndex(row + 1, col);
        if (grid.grid[nextRow] === SPLITTER) {
            const b = beams.pop();
            if (!usedSpaces.includes(b)){
                usedSpaces.push(b);
                total++;
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
    // grid.display();
    // console.log('iters?', iters);
    
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day7_2 = (input) => {
    let total = 0;

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
