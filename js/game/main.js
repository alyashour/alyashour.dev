import { GameArea, getGlobalGameArea, setGlobalGameArea } from "./gameArea.js";
import Rectangle from "./rectangle.js";
import Player from "./player.js";

console.log("Loading asteroids game...");

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
    // add a rectangle
    const background = new Rectangle(gameArea.canvas.width, gameArea.canvas.height, "black", 0, 0);
    gameArea.addToScene(background);

    // add the player
    const player = new Player(30, 30, 0.2, 0.1, gameArea.canvas.width, gameArea.canvas.height);
    gameArea.addToScene(player);
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

document.addEventListener('DOMContentLoaded', async () => {
    await includeHTML();
    main();
})
