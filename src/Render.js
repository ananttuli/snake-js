import { CoordUtil } from './CoordUtil.js';

/**
 * @type {import('./CoordUtil').Coord} Coord
 */
/**
 * @type {import('./Snake').SnakeType} SnakeType
 */


function Cell() {
    const el = document.createElement('div');
    el.className = 'cell';
    return el;
}

/**
 * 
 * @param {number} numCells 
 * @returns HTMLElement
 */
function Row(numCells) {
    const rowEl = document.createElement('div');
    rowEl.append(...Array(numCells).fill(0).map(c => Cell()));
    rowEl.className = 'row';
    return rowEl;
}

/**
 * 
 * @param {number} len 
 * @returns HTMLElement<Div>
 */
 export function GridCreate(len) {
    const gridEl = document.createElement('div')
    gridEl.id = 'grid';
    
    gridEl.append(
        ...Array(len).fill(0).map(r => Row(len))
    );

    document.body.appendChild(gridEl);
    return document.getElementById('grid');
}


/**
 * @param {SnakeType} snake 
 * @param {HTMLElement} gridEl
 * @param {Coord} baitCoord
 */
 export function GridUpdate(snake, gridEl, baitCoord) {
    const rows = gridEl.children;

    for(let i = 0; i < rows.length; i++) {
        const colEls = rows[i].children;

        for(let j = 0; j < rows.length; j++) {
            colEls[j].classList.remove('bait');
            colEls[j].classList.remove('snake');
            CoordUtil.containsCoord({x: i, y: j}, [snake.head, ...snake.body]) && colEls[j].classList.add('snake');
        }
    }

    rows[baitCoord.x].children[baitCoord.y].classList.add('bait');
}
