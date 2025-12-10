function parseInput(input) {
    const lines = input.toString().split('\r\n');
    const machines = [];

    for (const line of lines) {
        let expected = 0;
        const buttons = [];
        const joltages = [];

        for (let i = 0; i < line.length; i++) {
            switch (line[i]) {
                case '[': {
                    i++;
                    let str = '';
                    while (line[i] !== ']') {
                        str += line[i] === '#' ? '1' : '0';
                        i++;
                    }
                    // Don't like this. Better way to do this?
                    expected = parseInt([...str].reverse().join(''), 2);
                    break;
                }
                case '(': {
                    i++;
                    let button = 0;
                    let str = '';
                    while (line[i] !== ')') {
                        if (line[i] === ',') {
                            const shift = parseInt(str, 10);
                            button += (1 << shift);
                            str = '';
                        } else {
                            str += line[i];
                        }
                        i++;
                    }
                    if (str.length > 0) {
                        const shift = parseInt(str, 10);
                        button += (1 << shift);
                        str = '';
                    }
                    buttons.push(button);
                    break;
                }
                case '{': {
                    i++;
                    let str = '';
                    while (line[i] !== '}') {
                        if (line[i] === ',') {
                            joltages.push(parseInt(str, 10));
                            str = '';
                        } else {
                            str += line[i];
                        }
                        i++;
                    }
                    joltages.push(parseInt(str, 10));
                    break;
                }
            }
        }
        machines.push({ expected, buttons, joltages });
    }
    return machines;
}

function xorArray(arr) {
    return arr.reduce((acc, num) => acc ^ num, 0);
}

function findCombinationXor(nums, target) {
    const n = nums.length;
    const subsets = [];

    for (let i = 0; i < (1 << n); i++) {
        const subset = [];
        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
                subset.push(nums[j]);
            }
        }

        if (xorArray(subset) === target) {
            subsets.push(subset);
        }
    }

    return subsets;
}

/**
 * 
 * @param {Buffer} input 
 */
const day10_1 = (input) => {
    let total = 0;
    const machines = parseInput(input);
    // a^e = 0 where a is a button and e is expected the min presses is 1
    // a^b = e, where a,b are buttons and e is expected, the min presses is 2
    // (a^b) ^ e = c, where a,b,c are buttons, e is the expected value, the min is 3 presses
    // how to check for 4 or more? I suspect (a^b^c^...n) | e = d 
    // since xor is commutative? you should not need to ever push a button more than once
    // shoretest amount possible if no subset of combination of buttons matches would be the total number of buttons
    outer: for (const machine of machines) {
        // const machineStr = machine.expected
        //     .toString(2)
        //     .padStart(machine.joltages.length, '0')
        //     .split('')
        //     .reverse()
        //     .join('');
        // console.log('checking', machine.expected, '=>',machineStr);
        for (let i = 0; i < machine.buttons.length; i++) {
            const button = machine.buttons[i];
            // 1 press
            if (machine.buttons.includes(machine.expected)) {
                total++;
                continue outer;
            }

            // 2 presses
            if (machine.buttons.includes(button ^ machine.expected)) {
                total += 2;
                continue outer;
            }
        }

        // 3+ presses
        const subsets = findCombinationXor(machine.buttons, machine.expected);
        subsets.sort((a, b) => a.length - b.length);
        // console.log('shortest for', machine.expected, machineStr, 'is', subsets[0].length);
        // console.log(subsets);
        total += subsets[0].length;
    }

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day10_2 = (input) => {
    let total = 0;
    const machines = parseInput(input);
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day10 = (input) => {
    day10_1(input);
    day10_2(input);
};

module.exports = {
    day10
};
