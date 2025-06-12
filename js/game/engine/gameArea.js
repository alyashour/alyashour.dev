import { frameRateToMs, round } from "./util.js";

let globalGameArea;

export function getGlobalGameArea() {
    if (!globalGameArea) throw new Error("There is no global game area...");
    return globalGameArea;
}

export function setGlobalGameArea(gameArea) {
    // if the global game area exists
    if (globalGameArea) {
        // print a warning
        console.log("Overwriting global game area");
        globalGameArea = gameArea;
    } else {
        globalGameArea = gameArea;
    }
}

export class GameArea {
    constructor(container, canvas, fps, expectedAR) {
        if (!container) throw new Error("Container is null.");
        if (!canvas) throw new Error("Canvas is null");
        if (!fps) throw new Error("FPS is null");

        // initialize container
        this.container = container;

        // initialize canvas
        this.canvas = canvas;
        // Make sure the aspect ratio is as expected, otherwise throw an error
        // Since rectangles and stuff are hardcoded in, I'm adding this check
        // If this check fails, odds are the code just needs to be rewritten with new values
        // There are better solutions I don't care to implement
        const aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;
        const ratio = aspectRatio / expectedAR; // ratio between them
        const percentDifference = Math.abs(1 - ratio); // How much off expected are we?
        const allowedDifference = 0.05; // I'll let us be ±5%
        if (percentDifference > allowedDifference) {
            throw new Error(`
                Canvas aspect ratio mismatch!
                Expected ${round(expectedAR, 3)}, found (${round(aspectRatio, 3)})
            `);
        }

        // initialize other fields
        this.fps = fps
        this.context = this.canvas.getContext('2d');
        this.components = [];
        this.interval = null;

        this.keys = []; // key presses

        // Start tracking key presses
        const trackKeyPress = e => {
            e.preventDefault();

            this.keys[e.key] = (e.type == 'keydown');
        };

        window.addEventListener('keydown', trackKeyPress);
        window.addEventListener('keyup', trackKeyPress);
    }

    /**
     * Clears the Screen
     */
    #clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Update function called once per frame.
     */
    #update() {
        this.#clear();

        // Allow components to update
        for (let component of this.components) {
            component.update();
        }

        // Complete physics update (collisions)
        for (let i = 0; i < this.components.length; i++) {
            for (let j = i + 1; j < this.components.length; j++) {
                const a = this.components[i];
                const b = this.components[j];

                // NOT a good check since this requires that rigidBodies be all named the same thing
                // This is not necessarily true and not a good system.
                // Consider class inheritance instead or something like that.
                // BUT this system is very simple
                // and in a case like this where there are few components, it works.
                if (a.rigidBody && b.rigidBody) {
                    if (a.rigidBody.intersectsWith(b)) {
                        if (typeof a.rigidBody.onCollision === "function") a.rigidBody.onCollision(b);
                        if (typeof b.rigidBody.onCollision === "function") b.rigidBody.onCollision(a);
                    }
                }
            }
        }

        // Allow components to draw
        for (let component of this.components) {
            this.context.save();

            // Compute center of the component
            const cx = component.x + component.width / 2;
            const cy = component.y + component.height / 2;

            // Translate frame to center of component
            this.context.translate(cx, cy);

            // Rotate component
            this.context.rotate(component.angle);

            // Draw component
            component.draw();

            // Pop stack
            this.context.restore();
        }
    }

    /**
     * Starts the internal updating of the gameArea.
     */
    start() {
        // Start the update loop (non-blocking)
        this.interval = setInterval(this.#update.bind(this), frameRateToMs(this.fps));
    }

    addToScene(component) {
        this.components.push(component);
    }

    removeFromScene(component) {
        const index = this.components.indexOf(component);
        if (index !== -1) {
            this.components.splice(index, 1);
        }
    }

    gameOver() {
        this.onGameOver();
    }

    onGameOver() {}
}