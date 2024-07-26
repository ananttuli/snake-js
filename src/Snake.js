/**
 * @typedef {import('./CoordUtil').Coord} Coord
 */

import { CoordUtil } from "./CoordUtil.js";

/**
 * @callback SnakeFunction
 * @param {SnakeType} snake
 * @returns {void}
 */

/**
 * @typedef {Object} SnakeType
 * @property {Coord[]} body
 * @property {Coord} head
 * @property {'u' | 'd' | 'l' | 'r'} direction
 * @property {(snake: SnakeType) => boolean} move
 */

/**
 * @param {Coord} headCoord
 * @returns {SnakeType}
 */
export function Snake(headCoord) {
  /**
   *
   * @param {SnakeType} snake
   * @returns {boolean} baitWon
   * @returns {Coord} bait
   */
  function move(snake, bait) {
    const oldHead = { ...snake.head };

    // Update head
    snake.head =
      {
        u: (h) => {
          return { x: --h.x, y: h.y };
        },
        d: (h) => {
          return { x: ++h.x, y: h.y };
        },
        l: (h) => {
          return { x: h.x, y: --h.y };
        },
        r: (h) => {
          return { x: h.x, y: ++h.y };
        },
      }[snake.direction](snake.head) || snake.head;

    // Attach old head coordinate in front of the body
    snake.body.unshift(oldHead);

    // Remove last element
    const lastSegment = snake.body.pop();

    // Re-attach last element if snake attained bait
    if (
      typeof lastSegment?.x === "number" &&
      CoordUtil.isCoordSame(oldHead, bait)
    ) {
      snake.body.push(lastSegment);
      return true;
    }

    return false;
  }

  return {
    head: headCoord,
    body: [],
    direction: "r",
    move,
  };
}
