import { frameRateToMs } from "./util.js";

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
    constructor(container, canvas, fps) {
        if (!container) throw new Error("Container is null.");
        if (!canvas) throw new Error("Canvas is null");
        if (!fps) throw new Error("FPS is null");

        this.container = container;
        this.canvas = canvas;
        this.fps = fps

        this.context = this.canvas.getContext('2d');
        this.components = [];
        this.rigidBodies = [];
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

    addToPhysics(rigidBody) {
        this.components.push(rigidBody);
    }
}