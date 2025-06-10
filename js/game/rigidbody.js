/**
 * Any object in the game that can collide with things and move around
 */
export default class RigidBody {
    constructor(x, y, width, height, acceleration, vDampingRate) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.acceleration = acceleration;
        this.vDampingRate = vDampingRate;

        this.vx = 0;
        this.vy = 0;
    }

    update() {
        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;

        // Apply dampening effect
        this.vx *= this.vDampingRate;
        this.vy *= this.vDampingRate;
    }
}