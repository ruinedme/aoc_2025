function parseInput(input) {
    const fresh = []
    const available = [];
    let availbleTable = false;
    const lines = input.toString().split('\r\n')

    for (const line of lines) {
        if (line === '') {
            availbleTable = true;
            continue;
        }

        if (!availbleTable) {
            const ranges = line.split('-');
            const start = parseInt(ranges[0], 10);
            const end = parseInt(ranges[1], 10);
            fresh.push({ start, end });
        } else {
            available.push(parseInt(line, 10));
        }
    }

    return { fresh, available };
}

/**
 * 
 * @param {Buffer} input 
 */
const day5_1 = (input) => {
    let total = 0;
    const { fresh, available } = parseInput(input);
    fresh.sort((a, b) => a.start - b.start);
    available.sort((a, b) => a - b);

    for (const id of available) {
        for (const range of fresh) {
            const { start, end } = range;
            if (id >= start && id <= end) {
                total++;
                break;
            }
        }
    }

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day5_2 = (input) => {
    let total = 0;
    const { fresh, _ } = parseInput(input);
    fresh.sort((a, b) => a.start - b.start);

    for (let i = 0; i < fresh.length - 1; i++) {
        const a = fresh[i];
        for (let j = 1; j < fresh.length; j++) {
            // list is sorted by start value
            // a.start will always be <= b.start
            const b = fresh[j];
            if (b.start < a.start) continue; // WHY!!!! The list is sorted this should never happen
            if (a !== b && b.start <= a.end) {
                // console.log('a', a, 'overlaps', 'b', b);
                fresh[i] = { start: a.start, end: Math.max(a.end,b.end) };
                fresh.splice(j, 1);
                // restart the loop
                i = -1;
                break;
            }
        }
    }

    // console.log('=== reduced product ids ===');
    // fresh.forEach(x => console.log(x));

    total = fresh.reduce((acc, cur) => (cur.end - cur.start + 1) + acc, 0)
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day5 = (input) => {
    day5_1(input);
    day5_2(input);
};

module.exports = {
    day5
};
