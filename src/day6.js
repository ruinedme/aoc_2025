/**
 * 
 * @param {*} input 
 * @returns {string[][]}
 */
function parseInput(input) {
    const lines = input.toString().split('\r\n');
    const parsedValues = [];
    const ops = lines.pop();
    let start = 0;
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === ' ' && ops[i + 1] !== ' ') {
            // We're in the column separator at this point / or end of line
            const value = [];
            for (const line of lines) {
                const str = i + 1 < ops.length ? line.substring(start, i) : line.substring(start);
                value.push(str);
            }
            opStr = ops.substring(start, i)
            value.push(opStr);
            parsedValues.push(value);
            if (i + 1 < ops.length) {
                start = i + 1; // Next Op
            }
        }
    }

    // const parsedValues = lines.map((v) => v.trim().split(/\s+/)); // parsing for part 1
    return parsedValues;
}

/**
 * 
 * @param {Buffer} input 
 */
const day6_1 = (input) => {
    let total = 0;
    // All inputs have the same number columns/rows, and only 1 operator in the last column
    const values = parseInput(input);

    for (const row of values) {
        const op = row.pop().trim();
        // Probably some better way to handle this
        if (op === '+') {
            total += row.reduce((acc, cur) => parseInt(cur, 10) + acc, 0);
        } else {
            total += row.reduce((acc, cur) => parseInt(cur, 10) * acc, 1);
        }
    }
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day6_2 = (input) => {
    let total = 0;
    const values = parseInput(input);
    // console.log(values);

    // OP symbols are all left aligned
    // We can look ahead at to the next symbol to know where then column separator is
    for (const row of values) {
        const op = row.pop().trim();
        const newNums = [];
        const width = row[0].length;
        for (let i = 0; i < width; i++) {
            let s = '';
            for (col of row) {
                s += col[i];
            }
            newNums.push(parseInt(s, 10));
        }

        // console.log('new nums', newNums);
        if (op === '+') {
            total += newNums.reduce((acc, cur) => cur + acc, 0);
        } else {
            total += newNums.reduce((acc, cur) => cur * acc, 1);
        }
    }
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day6 = (input) => {
    day6_1(input);
    day6_2(input);
};

module.exports = {
    day6
};
