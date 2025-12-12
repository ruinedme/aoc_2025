/**
 * 
 * @param {Buffer} input 
 */
function parseInput(input) {
    const lines = input.toString().split('\r\n');
    const regions = [];
    const shapes = [];

    // parse regions
    while (true) {
        const region = lines.pop();
        if (region === '') break;
        const [dim, counts] = region.split(': ');
        const [width, height] = dim.split('x').map((x) => parseInt(x, 10));
        const presents = counts.split(' ').map(x => parseInt(x, 10));
        regions.push({ width, height, presents });
    }

    // parse shapes
    for (let i = 0; i < lines.length; i += 5) {
        const shape = [lines[i + 1], lines[i + 2], lines[i + 3]];
        shapes.push(shape);
    }

    return { regions, shapes };
}

/**
 * 
 * @param {string[]} shape 
 */
function displayShape(shape) {
    shape.forEach(x => console.log(x));
    console.log('===');
}

/**
 * 
 * @param {Buffer} input 
 */
const day12_1 = (input) => {
    let total = 0;
    const { regions, shapes } = parseInput(input);
    // shapes.forEach((x) => displayShape(x));

    // Each present fits in a 3x3
    // Presents can be rotated and/or flipped
    // Is there anyway to do this without simulating placing each shape into a grid?
    // Create NxM matrix of 0 and 1, convert each shape into a 3x3 matrix of 0 and 1
    // Are you better off placing all of one shape as densely as possible first?
    // Maybe take the shape that requires the least amount, and place that many of each shape.
    // Would a collapsing wave function or something similar be useful here?

    // General Idea
    // starting with the top left of the grid, and using the top left of a shape as the origin
    // Scan the grid if the shape can be placed into the grid without overlapping on another shape
    // If the shape does overlap
    //      1. rotate shape clock clockwise and recheck
    //      2 .while the shape overlaps shift the origin by 1, then shift back and increase row by 1 until all 9 points have been checked
    //      3. Repeat 1 and 2 until the shape has been rotated 3 times
    //      4. Flip the shape, then repeat 1 - 3
    //      5. Shift origin right by 4, the repeat 1 - 4
    //      6. Keep shifting until the origin is M -3 from the edge, then shift origin on the row by 4. Repeat 1 - 5
    //      7. At this point we should be sure the shape won't fit, and move on.
    //      This sounds like it would take forever given that there is 1000 or so regions to check

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day12_2 = (input) => {
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day12 = (input) => {
    day12_1(input);
    day12_2(input);
};

module.exports = {
    day12
};
