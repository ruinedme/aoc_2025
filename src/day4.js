const { Grid } = require('./utils/grid');

/**
 * 
 * @param {Buffer} input 
 */
const day4_1 = (input) => {
    let total = 0;
    const grid = new Grid(input);

    for (let i = 0; i < grid.grid.length; i++) {
        if (grid.grid[i] === '@'.charCodeAt(0)) {
            const n = grid.getAllNeighbors(i);
            const rolls = n.filter(x => grid.grid[x] === '@'.charCodeAt(0));
            if (rolls.length < 4) {
                total++;
            }
        }
    }

    // grid.display();
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day4_2 = (input) => {
    let total = 0;
    const grid = new Grid(input);

    let canRemove = true;
    while (canRemove) {
        const toRemove = [];
        for (let i = 0; i < grid.grid.length; i++) {
            if (grid.grid[i] === '@'.charCodeAt(0)) {
                const n = grid.getAllNeighbors(i);
                const rolls = n.filter(x => grid.grid[x] === '@'.charCodeAt(0));
                if (rolls.length < 4) {
                    toRemove.push(i);
                }
            }
        }

        // exit condition
        if (toRemove.length === 0) canRemove = false;

        // number of rolls removed
        total += toRemove.length;

        // update grid with removed rolls
        for(const i of toRemove){
            grid.grid[i] = '.'.charCodeAt(0);
        }
    }

    grid.display();
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day4 = (input) => {
    day4_1(input);
    day4_2(input);
};

module.exports = {
    day4
};
