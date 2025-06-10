import { GameArea, getGlobalGameArea, setGlobalGameArea } from "./gameArea.js";
import Rectangle from "./rectangle.js";

console.log("Loading asteroids game...");

const FAIL_FAST = true; // should the system fail fast or continue on problem?
const FRAME_RATE = 60; // default: 60fps

const canvas = {
    height: 200,
    width: 1200,
}

function init() {
    // Initialize game board
    try {
        let gameArea = new GameArea(
            document.getElementById('game-container'),
            document.getElementById('game-canvas'),
            FRAME_RATE
        );

        setGlobalGameArea(gameArea);

        // Make sure the aspect ratio is as expected, otherwise throw an error
        // Since rectangles and stuff are hardcoded in, I'm adding this check
        // If this check fails, odds are the code just needs to be rewritten with new values
        // There are better solutions I don't care to implement
        const expectedAR = canvas.width / canvas.height;
        const aspectRatio = gameArea.canvas.clientWidth / gameArea.canvas.clientHeight;
        
        const ratio = aspectRatio / expectedAR; // ratio between them
        const percentDifference = Math.abs(1 - ratio); // How much off expected are we?
        const allowedDifference = 0.05; // I'll let us be ±5%
        if (percentDifference > allowedDifference) {
            throw new Error(`
                Canvas aspect ratio mismatch!
                Expected ${round(expectedAR, 3)}, found (${round(aspectRatio, 3)})
            `);
        }

    } catch (err) {
        const text = `Failed to initialize asteroids game, ${err}`
        if (FAIL_FAST) alert(text);
        else console.log(text);

        return false;
    }

    return true;
}

function start(gameArea) {
    // add a rectangle
    const background = new Rectangle(canvas.width, canvas.height, "black", 0, 0);
    gameArea.addToScene(background);

    const player = new Player(30, 30, "blue", 0.3, 0.1, "/img/asteroids_player_white.svg");

    gameArea.addToScene(player);
}

function main() {
    if (!init()) {
        return;
    }

    const gameArea = getGlobalGameArea();
    gameArea.start();  // starts the update loop at the target FPS

    try {
        start(gameArea);
    } catch (err) {
        const text = `Asteroids game error! ${err.message}.\n\nStack Trace ${err.stack}`
        if (FAIL_FAST) alert(text);
        else console.log(text);

        return;
    }
}

// Has to be called using a listener because of dependency
// This has to wait for the partial includes to run
import includeHTML from "../includes.js";
import { round } from "./util.js";
import Player from "./player.js";

document.addEventListener('DOMContentLoaded', async () => {
    await includeHTML();
    main();
})
