function parseInput(input) {
    const points = [];
    const lines = input.toString().split('\r\n');
    const re = /(\d+),(\d+)/
    for (const line of lines) {
        const parsed = re.exec(line);
        points.push({ x: parseInt(parsed[1], 10), y: parseInt(parsed[2], 10) });
    }

    return points;
}

// function squareDistance(a, b) {
//     return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
// }

function area(a, b) {
    const x = Math.abs(a.x - b.x) + 1;
    const y = Math.abs(a.y - b.y) + 1;
    return x * y;
}

/**
 * 
 * @param {Buffer} input 
 */
const day9_1 = (input) => {
    let total = 0;
    const points = parseInput(input);
    // const pairs = [];

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const a = area(points[i], points[j]);
            if (a > total) total = a;
            // Apparently this is not a good indicator of how large the square is
            // Just because the diagonal distance is larger does not mean the area is bigger
            // Why is that?
            // const distance = squareDistance(points[i],points[j]);
            // pairs.push({a:i,b:j});
        }
    }

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day9_2 = (input) => {
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day9 = (input) => {
    day9_1(input);
    day9_2(input);
};

module.exports = {
    day9
};
