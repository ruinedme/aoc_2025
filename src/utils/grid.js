const CR = '\r'.charCodeAt(0);
const LF = '\n'.charCodeAt(0);
const CRLF = Buffer.from([CR, LF]);

const Direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
};

/**
 * Helper class for working with grids
 */
class Grid {
    /**
     * 
     * @param {Buffer} buffer 
     */
    constructor(buffer) {
        /** @type number */
        this.width = buffer.indexOf(CRLF);
        if (this.width === -1) this.width = buffer.length;
        /** @type Buffer*/
        this.grid = buffer.filter((value) => value !== CR && value !== LF);
        /** @type number */
        this.height = Math.floor(this.grid.length / this.width);
    }

    /**
     * 
     * @param {number} row 
     * @param {number} col 
     * @returns The index of the flattened grid
     * @throws RangeError
     */
    getIndex(row, col) {
        if ((row > this.height || row < 0) || (col > this.width - 1 || col < 0)) {
            const err = `Row or Col is out of range: ${row}, ${col}`;
            throw new RangeError(err);
        }

        return this.width * row + col;
    }

    /**
     * 
     * @param {number} index 
     * @returns {{row: number, col: number}}the row, col of the grid from the given index
     * @throws RangeError
     */
    getRowCol(index) {
        if (index > this.grid.length - 1 || index < 0) {
            throw new RangeError(`Index out of bounds ${index}`);
        }

        // edge case for 1 row grid
        const row = this.height > 1 ? Math.floor(index / this.height) : 0;
        const col = index % this.width;
        return { row, col };
    }

    /**
     * 
     * @param {number} index 
     * @returns {[up: number, right: number, down: number, left: number]} Returns the indicies of the neighbors for given index. 
     * 
     * If no valid neighbor will return -1
     * 
     */
    getCardinalNeighbors(index) {
        const { row, col } = this.getRowCol(index);

        let up = -1;
        if (row > 0) up = this.getIndex(row - 1, col);

        let right = -1;
        if (col < this.width - 1) right = this.getIndex(row, col + 1);

        let down = -1;
        if (row < this.height - 1) down = this.getIndex(row + 1, col);

        let left = -1;
        if (col > 0) left = this.getIndex(row, col - 1);

        return [up, right, down, left];
    }

    /**
     * 
     * @param {number} index 
     * @returns {[
     *  up: number, 
     *  upRight: number, 
     *  right: number, 
     *  downRight: number, 
     *  down: number, 
     *  downLeft:number, 
     *  left: number, 
     *  upLeft: number
     * ]} Returns the indicies of the neighbors for given index.
     */
    getAllNeighbors(index) {
        const neighbors = this.getCardinalNeighbors(index);
        const { row, col } = this.getRowCol(index);
        // up-right
        (neighbors[0] !== -1 && neighbors[1] !== -1) ? neighbors.push(this.getIndex(row - 1, col + 1)) : neighbors.push(-1);
        // down right
        (neighbors[2] !== -1 && neighbors[1] !== -1) ? neighbors.push(this.getIndex(row + 1, col + 1)) : neighbors.push(-1);
        // down left
        (neighbors[2] !== -1 && neighbors[3] !== -1) ? neighbors.push(this.getIndex(row + 1, col - 1)) : neighbors.push(-1);
        // up left
        (neighbors[0] !== -1 && neighbors[3] !== -1) ? neighbors.push(this.getIndex(row - 1, col - 1)) : neighbors.push(-1);


        return [neighbors[0], neighbors[4], neighbors[1], neighbors[5], neighbors[2], neighbors[6], neighbors[3], neighbors[7]];
    }

    /**
     * Renders Grid to console
     */
    display() {
        for (let y = 0; y < this.height; y++) {
            console.log(this.grid.subarray(y * this.width, y * this.width + this.width).toString());
        }
    }

};

module.exports = {
    Grid,
    Direction
};
