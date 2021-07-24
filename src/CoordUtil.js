export const CoordUtil = {
    isCoordSame,
    getRandomUnusedCoord: getRandomUnusedCoord,
    containsCoord
}

/**
* 
* @param {Coord} c1 
* @param {Coord} c2 
* @returns 
*/
function isCoordSame(c1, c2) {
    return c1.x === c2.x && c1.y === c2.y;
}


/**
 * 
 * @param {Coord[]} exceptions 
 * @param {*} len 
 */
 function getRandomUnusedCoord(exceptions, len) {
    const newCoord = { x: Math.floor(Math.random() * (len - 1)),
        y: Math.floor(Math.random() * (len - 1))};
    
    return containsCoord(newCoord, exceptions) ?
        getRandomUnusedCoord(exceptions, len) :
        newCoord
}

var __test = 0;

function containsCoord(newCoord, coords) {
    return coords.some(c => CoordUtil.isCoordSame(c, newCoord));
}


/**
 * @typedef {Object} Coord
 * @property {number} x
 * @property {number} y
 */