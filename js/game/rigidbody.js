import { rectsIntersect, circlesIntersect } from "./util.js";

/**
 * Any object in the game that can collide with things and move around
 */
export default class RigidBody {
    constructor(x, y, width, height, acceleration, maxX, maxY, vDampingRate = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.acceleration = acceleration;
        this.vDampingRate = vDampingRate;

        this.vx = 0;
        this.vy = 0;

        this.maxX = maxX;
        this.maxY = maxY;
    }

    intersectsWith(other) {
        return rectsIntersect(this.x, this.y, this.width, this.height, other.x, other.y, other.width, other.height);
    }

    /**
     * When an object collides with another rigid body
     * @param {RigidBody} other 
     */
    onCollision(other) { }

    /**
     * When this object collides with the border.
     * As of now, do nothing. Can be overwridden with `rigidbody.onBorderCollision = () => {};`
     */
    handleBorderCollision() { };

    update() {
        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;

        // Apply border behaviour (i.e., collision)
        this.handleBorderBehaviour();

        // Apply dampening effect
        this.applyDampening();
    }

    /**
     * Called once per update, applies border behaviour (collision)
     */
    handleBorderBehaviour() {
        console.log('test');
        if (this.detectBorderCollision()) this.handleBorderCollision();
    }

    /**
     * Checks if the rigidbody is touching the bounds of the border
     * @returns True if collision occured, false otherwise
     */
    detectBorderCollision() {
        return (
            this.x < 0 ||                       // if past the left wall
            this.x + this.width > this.maxX ||  // if past the right wall
            this.y < 0 ||                       // if past the top wall
            this.y + this.height > this.maxY    // if past the bottom wall
        );
    }

    /**
     * Dampens the rigidbody's velocity.
     */
    applyDampening() {
        this.vx *= this.vDampingRate;
        this.vy *= this.vDampingRate;
    }
}