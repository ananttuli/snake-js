import { CoordUtil } from './CoordUtil.js';
import { GridCreate, GridUpdate } from './Render.js';
import { Snake } from './Snake.js';


/**
 * @type {import('./CoordUtil').Coord} Coord
 */

/**
 * @type {import('./Snake').SnakeType} SnakeType
 */

const GRID_SIZE = 50

const config = {
    len: GRID_SIZE,
    startCoords: { x: Math.floor(GRID_SIZE/2), y: Math.floor(GRID_SIZE/2) },
    speed: 0.15
};

const Render = {
    lastRenderTime: 1,
    gridEl: GridCreate(config.len)
}

/** @type State */
const state =  initState();





/**
 * 
 * @returns {State}
 */
function initState() {

    const snake = Snake(config.startCoords);
    
    const bait = CoordUtil.getRandomUnusedCoord(snake.body, config.len);

    const state = {
        direction: 'right',
        isAlive: true,
        snake,
        bait
    };

    return state;
}


function isInBounds(x, y) {
    return x < config.len && x >= 0 && y < config.len && y >= 0;
}


function executeLogicLoop() {
    
    // Move snake and change coords
    const baitWon = state.snake.move(state.snake, state.bait);

    //---- Update state ------
    
    // Set bait
    state.bait = baitWon ?
        CoordUtil.getRandomUnusedCoord([state.snake.head, ...state.snake.body], config.len) :
        state.bait;

    // Check if snake has collided with either the walls or its own body
    state.isAlive = isInBounds(state.snake.head.x, state.snake.head.y) &&
        !CoordUtil.containsCoord(state.snake.head, state.snake.body);

    if(baitWon) {
        // If bait won, increase speed by 10%
        config.speed = config.speed - 0.05*config.speed;
    }

    return state.isAlive;
}

function updateLoop(timestamp) {
    const elapsed = timestamp - Render.lastRenderTime;
    if(elapsed > (config.speed * 1000)) {

        executeLogicLoop();

        GridUpdate(state.snake, Render.gridEl, state.bait);

        Render.lastRenderTime = timestamp;
    }

    state.isAlive && window.requestAnimationFrame(updateLoop);
    !state.isAlive && alert('Sorry, you lost');
}

function addControls() {
    // ['u', 'd', 'l', 'r'].forEach((d) => document.getElementById(d).onclick = () => state.snake.direction = d);
    document.addEventListener('keydown', (e) => {
        state.snake.direction = ({
            'ArrowUp': 'u',
            'ArrowDown': 'd',
            'ArrowLeft': 'l',
            'ArrowRight': 'r',
        })[e.key] || state.snake.direction;
    });

}

function Game() {
    addControls();

    window.requestAnimationFrame(updateLoop)
}

Game();

/*************************************************************************************
 *  Types
 * 
 */

/**
 * @typedef {import('./Snake').SnakeType} SnakeType
 */

/**
 * @typedef {Object} State
 * @property {string} direction
 * @property {boolean} isAlive
 * @property {SnakeType} snake
 * @property {Coord} bait
 * 
 */