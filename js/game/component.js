import { getGlobalGameArea } from "./gameArea.js";

/**
 * A component is any art or glyph in the game with a position and size.
 */
export default class Component {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.angle = 0;

        this.gameArea = getGlobalGameArea();
        if (this.gameArea == null) {
            throw new Error("There's no global game area, make sure to set one with 'setGlobalGameArea()' before creating an object.")
        }
        this.context = this.gameArea.context;
    }

    update() {}
    draw() {}
}
