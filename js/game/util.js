import Asteroid from "./asteroid.js";
import {
    randomFloat,
    randomInt
} from "./engine/util.js";
import {
    ASTEROID_MIN_START_SPEED, ASTEROID_MAX_START_SPEED,
    ASTEROID_MIN_SIZE, ASTEROID_MAX_SIZE
} from "./defaults.js";

/**
 * Creates an asteroid randomly. It will have random size, variant, position, and velocity.
 * @param {object} canvas 
 * @param {number?} size 
 * @returns the asteroid
 */
export function createRandomAsteroid(canvas, size=null) {
    // set size if not provided
    if (!size) {
        size = randomInt(ASTEROID_MIN_SIZE, ASTEROID_MAX_SIZE + 1)
    }

    // create asteroid
    const asteroid = new Asteroid(
        size,
        randomInt(0, canvas.width), randomInt(0, canvas.height),
        canvas.width, canvas.height
    );

    // give random velocity
    const speed = randomFloat(ASTEROID_MIN_START_SPEED, ASTEROID_MAX_START_SPEED);
    const dir = randomFloat(0, 2 * Math.PI); // in radians
    asteroid.rigidBody.vx = speed * Math.cos(dir);
    asteroid.rigidBody.vy = speed * Math.sin(dir);

    return asteroid;
}