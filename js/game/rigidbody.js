/**
 * Any object in the game that can collide with things and move around
 */
export default class RigidBody {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}