/**
 * 
 * @param {Buffer} input 
 */
function parseInput(input) {
    const lines = input.toString().split('\r\n');
    const devices = {};

    for (const line of lines) {
        const path = line.split(' ');
        const start = path[0].substring(0, 3); // All devices are 3 letters

        devices[start] = path.slice(1);
        // devices.push(device);
    }

    return devices;
}

/**
 * Returns a copy of arr1
 */
function copyArray(arr1) {
    const newArray = new Array(arr1.length);
    for (let i = 0; i < arr1.length; i++) {
        newArray[i] = arr1[i];
    }
    return newArray;
}

function getPaths(devices, start, filter = []) {
    const unexplored = [];
    let complete = 0;
    // const terminals = [];
    for (const d of devices[start]) {
        unexplored.push([start, d]);
    }

    outer: while (unexplored.length > 0) {
        // console.log('unexplored', unexplored.length);
        /**
         * @type string[]
         */
        const current = unexplored.pop();
        // console.log('exploring', current);
        const end = current.length - 1;
        const node = devices[current[end]];
        // got end
        if ((node[0] === 'out') && filter.length > 0) {
            // does the path contain all nodes in the filter
            for (const f of filter) {
                if (!current.includes(f)) {
                    continue outer;
                }
            }
            current.push('out');
            if(complete % 1000 === 0){
                console.log('paths found', complete, 'unexplored', unexplored.length);
                // console.log('found path', current);
            }
            complete++;
            continue;

        } else if (node[0] === 'out') {
            current.push('out');
            // complete.push(current);
            complete++;
            continue;
        }
        const tmpArr = copyArray(current);
        // Keep traversing this path
        current.push(node[0]);
        unexplored.push(current);
        // Add forks to unexplored paths;
        for (let i = 1; i < node.length; i++) {
            const t = copyArray(tmpArr);
            t.push(node[i]);
            unexplored.push(t);
        }
    }
    // console.log('terminals', terminals);

    return complete;
}

/**
 * 
 * @param {Buffer} input 
 */
const day11_1 = (input) => {
    let total = 0;
    const devices = parseInput(input);
    const paths = getPaths(devices, 'you');

    total = paths;
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day11_2 = (input) => {
    let total = 0;
    const devices = parseInput(input);
    console.log('getting server paths');
    // works in theory for sample input, i suspect i get an infinite loop.
    // let it run for a while and got 22M+ paths which just doesn't seem correct
    total = getPaths(devices, 'fft', ['dac']);
    // also check dac => fft and add that to total

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day11 = (input) => {
    // day11_1(input);
    day11_2(input);
};

module.exports = {
    day11
};
