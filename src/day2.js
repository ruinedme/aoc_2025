/**
 * 
 * @param {Buffer} input 
 * @returns {{start:number, end:number}}
 */
function parseInput(input) {
    let ranges = [];
    let start = '', end = '';
    let foundDash = false;
    for (const n of input) {
        const c = String.fromCharCode(n);
        switch (c) {
            case '-': {
                foundDash = true;
                break;
            }
            case ',': {
                foundDash = false;
                ranges.push({ start: parseInt(start), end: parseInt(end) });
                start = '';
                end = '';
                break;
            }
            default: {
                if (foundDash) {
                    end += c;
                } else {
                    start += c;
                }
            }
        }
    }
    ranges.push({ start: parseInt(start), end: parseInt(end) });
    return ranges;
}

/**
 * 
 * @param {Buffer} input 
 */
const day2_1 = (input) => {
    let total = 0;
    const ranges = parseInput(input);
    const invalidIds = [];
    for (let range of ranges) {
        // console.log(range);
        const { start, end } = range;
        for (let i = start; i <= end; i++) {
            const s = i.toString(10);
            // I don't beleive any odd lengthed base 10 number would be able to have a repating number so just skip them
            if (s.length % 2 === 1) {
                // skip to the next even lengthed number
                if (i * 10 < end) i *= 10;
                continue;
            }

            const window = Math.floor(s.length / 2);
            const front = s.substring(0, window);
            const back = s.substring(window);
            // console.log('id', i, 'front', front, 'back', back);
            if (front === back) {
                invalidIds.push(i);
                i += Math.pow(10, window); // No other values will match so so skip
                continue;
            }

            // -1 so the next iteration will match if it is less than end range
            const t = parseInt(front + front) - 1;
            // edge case where this can end up being smaller than the start value
            if (t > start) i = t;
        }
    }

    // console.log(invalidIds);
    total = invalidIds.reduce((acc, cur) => acc + cur, 0);
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day2_2 = (input) => {
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day2 = (input) => {
    day2_1(input);
    day2_2(input);
};

module.exports = {
    day2
};
