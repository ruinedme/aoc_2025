function parseInput(input) {
    const lines = input.toString().split('\r\n');
    const boxes = [];
    const re = /(\d+),(\d+),(\d+)/
    for (line of lines) {
        const parsed = re.exec(line);
        boxes.push({ x: parsed[1], y: parsed[2], z: parsed[3] });
    }

    return boxes;
}

function squareDistance(a, b) {
    return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2);
}

/**
 * 
 * @param {Buffer} input 
 */
const day8_1 = (input) => {
    let total = 0;
    console.log('starting');
    const junctions = parseInput(input);
    console.log('parsed');
    junctions.sort((a, b) => {
        if (a.x !== b.x) return a.x - b.x;
        if (a.y !== b.y) return a.y - b.y;
        return a.z - b.z;
    });
    console.log('sorted junctions');

    const distances = [];
    console.log('checking distance between pairs');
    for (let i = 0; i < junctions.length - 1; i++) {
        for (let j = i+1; j < junctions.length; j++) {
            const a = junctions[i];
            const b = junctions[j];
            if (a === b) continue

            const distance = squareDistance(a, b);
            distances.push({ a: i, b: j, distance });
        }
    }
    console.log('sorting distances')
    distances.sort((a, b) => a.distance - b.distance);

    console.log('building circuits');
    const circuits = [];
    outer: for (let i = 0; i < 10; i++) {
        const boxPair = distances.shift();
        console.log(boxPair);
        for (const c of circuits) {
            // Append to existing circuit
            if (c.includes(boxPair.a) && !c.includes(boxPair.b)) {
                c.push(boxPair.b);
                continue outer;
            }
            if (c.includes(boxPair.b) && !c.includes(boxPair.a)) {
                c.push(boxPair.a);
                continue outer;
            }
            // Circuit was already matched previously
            if (c.includes(boxPair.a) && c.includes(boxPair.b)) {
                continue outer;
            }
        }

        // Circuit was not already added
        circuits.push([boxPair.a, boxPair.b]);
    }

    console.log('collapsing circuits');
    // Is there some way to avoid needing to do this?
    // final pass to collapse circuits
    let canCollapse = true;
    outer2: while (canCollapse) {
        // iterate over each circuit
        for (let i = 0; i < circuits.length - 1; i++) {
            // iterate to check if the next circuit can collapse into circuit[i]
            const next = circuits[i + 1];
            for (let j = 0; j < next.length; j++) {
                if (circuits[i].includes(next[j])) {
                    console.log('collapsing', next, 'into', circuits[i]);
                    // remove the connecting value
                    next.splice(j, 1);
                    // append the rest to circuit[i]
                    while (next.length > 0) {
                        circuits[i].push(next.pop());
                    }
                    circuits.splice(i + 1, 1);
                    continue outer2;
                }
            }
        }
        canCollapse = false;
    }

    circuits.sort((a, b) => b.length - a.length);
    console.log(circuits, circuits.length);
    total = circuits[0].length * circuits[1].length * circuits[2].length;
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day8_2 = (input) => {
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day8 = (input) => {
    day8_1(input);
    day8_2(input);
};

module.exports = {
    day8
};
