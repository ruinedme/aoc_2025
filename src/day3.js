
function parseInput(input) {
    return input.toString().split('\r\n');
}

/**
 * 
 * @param {Buffer} input 
 */
const day3_1 = (input) => {
    let total = 0;
    const banks = parseInput(input);
    for (bank of banks) {
        let left = '0';
        let leftIndex = 0;
        let right = '0';
        for (let i = 0; i < bank.length - 1; i++) {
            if (bank[i] > left) {
                left = bank[i];
                leftIndex = i;
                if (left === '9') break;
            }
        }
        for (let i = leftIndex + 1; i < bank.length; i++) {
            if (bank[i] > right) right = bank[i];
        }
        const joltage = parseInt(left + right, 10);
        total += joltage;
    }

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day3_2 = (input) => {
    let total = 0;
    const banks = parseInput(input);
    outer: for (bank of banks) {
        let left = '0';
        let leftIndex = 0; // track starting point for next scan
        let max_scan = 11; // track how far into the bank we can scan
        for (let i = 0; i < bank.length - max_scan; i++) {
            if (bank[i] > left) {
                left = bank[i];
                leftIndex = i;
                if (left === '9') break;
            }
        }

        max_scan--;
        while (left.length < 12) {
            let right = '0'
            for (let i = leftIndex+1; i < bank.length - max_scan; i++) {
                if (bank[i] > right) {
                    right = bank[i];
                    leftIndex = i;
                    if (right === '9') break;
                }
            }

            if (right === '0'){
                console.error('Invalid value');
                break outer;
            }
            left += right;
            max_scan--;
        }

        const joltage = parseInt(left, 10);
        total += joltage;
    }

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day3 = (input) => {
    day3_1(input);
    day3_2(input);
};

module.exports = {
    day3
};
