/**
 * Any object in the game that can collide with things and move around
 */
export default class RigidBody {
    constructor(x, y, width, height, acceleration, maxX, maxY, vDampingRate=1) {
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

    /**
     * When an object collides with another rigid body
     * @param {RigidBody} other 
     */
    onCollision(other) {}

    /**
     * When this object collides with the border.
     * As of now, do nothing. Can be overwridden with `rigidbody.onBorderCollision = () => {};`
     */
    onBorderCollision() {};

    update() {
        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;

        // Rigidbodies can't go out of bounds
        if (
            this.x < 0 ||          // if past the left wall
            this.x + this.width > this.maxX ||  // if past the right wall
            this.y < 0 ||         // if past the top wall
            this.y + this.height > this.maxY    // if past the bottom wall
        ) this.onBorderCollision();

        // Apply dampening effect
        this.vx *= this.vDampingRate;
        this.vy *= this.vDampingRate;
    }
}