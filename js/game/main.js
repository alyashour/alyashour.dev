import includeHTML from "../includes.js";
import Player from "./player.js";
import Rectangle from "./engine/rectangle.js";
import { createRandomAsteroid } from "./util.js";
import { GameArea, getGlobalGameArea, setGlobalGameArea } from "./engine/gameArea.js";

const FAIL_FAST = true; // should the system fail fast or continue on problem?
const FRAME_RATE = 60; // default: 60fps

function init() {
    // Initialize game board
    try {
        let gameArea = new GameArea(
            document.getElementById('game-container'),
            document.getElementById('game-canvas'),
            FRAME_RATE,  4 / 1
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
    const player = new Player(80, 80, canvas.width, canvas.height);
    gameArea.addToScene(player);

    // add 5 asteroids
    for (let i = 0; i < 5; i++) {
        const asteroid = createRandomAsteroid(canvas);

        gameArea.addToScene(asteroid);
    }
}

function main() {
    if (!init()) {
        return;
    }

    // get global game area
    const gameArea = getGlobalGameArea();

    // set game over behaviour
    gameArea.onGameOver = () => {
        gameArea.components = [];
        createScene(gameArea);
    };

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

document.addEventListener('DOMContentLoaded', async () => {
    await includeHTML();
    main();
})
