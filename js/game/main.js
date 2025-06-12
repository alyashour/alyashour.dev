import Player from "./player.js";
import Rectangle from "./rectangle.js";
import { randomFloat, randomInt } from "./util.js";
import { 
    ASTEROID_MAX_SIZE, ASTEROID_MIN_SIZE,
    ASTEROID_MAX_START_SPEED, ASTEROID_MIN_START_SPEED 
} from "./defaults.js";
import { GameArea, getGlobalGameArea, setGlobalGameArea } from "./gameArea.js";

const FAIL_FAST = true; // should the system fail fast or continue on problem?
const FRAME_RATE = 60; // default: 60fps

function init() {
    // Initialize game board
    try {
        let gameArea = new GameArea(
            document.getElementById('game-container'),
            document.getElementById('game-canvas'),
            FRAME_RATE,  6 / 1
        );

        setGlobalGameArea(gameArea);
    } catch (err) {
        const text = `Failed to initialize asteroids game:\n ${err.message}`
        if (FAIL_FAST) {
            err.message = text;
            throw err;
        }
        else console.log(text);

        return false;
    }

    return true;
}

function createScene(gameArea) {
    const canvas = gameArea.canvas;

    // add a rectangle
    const background = new Rectangle(canvas.width, canvas.height, "black", 0, 0);
    gameArea.addToScene(background);

    // add the player
    const player = new Player(80, 80, 0.2, 0.1, canvas.width, canvas.height);
    gameArea.addToScene(player);

    // add 5 asteroids
    for (let i = 0; i < 5; i++) {
        const asteroid = new Asteroid(
            randomInt(ASTEROID_MIN_SIZE, ASTEROID_MAX_SIZE + 1), 
            randomInt(0, canvas.width), randomInt(0, canvas.height), 
            canvas.width, canvas.height
        );

        // give random velocity
        const speed = randomFloat(ASTEROID_MIN_START_SPEED, ASTEROID_MAX_START_SPEED);
        const dir = randomFloat(0, 2 * Math.PI); // in radians
        asteroid.rigidBody.vx = speed * Math.cos(dir);
        asteroid.rigidBody.vy = speed * Math.sin(dir);
        
        gameArea.addToScene(asteroid);
    }
}

function main() {
    if (!init()) {
        return;
    }

    const gameArea = getGlobalGameArea();
    gameArea.start();  // starts the update loop at the target FPS

    try {
        createScene(gameArea);
    } catch (err) {
        const text = `Asteroids game error! ${err.message}.\n\nStack Trace ${err.stack}`
        if (FAIL_FAST) {
            err.message = text;
            throw err;
        } else console.log(text);

        return;
    }
}

// Main has to be called using a listener because of dependency
// Must wait for the partial includes to run
import includeHTML from "../includes.js";
import Asteroid from "./asteroid.js";

document.addEventListener('DOMContentLoaded', async () => {
    await includeHTML();
    main();
})
