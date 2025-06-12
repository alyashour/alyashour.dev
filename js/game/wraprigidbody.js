import RigidBody from "./rigidbody.js";

/**
 * Extends the original RigidBody to wrap around the edges of the game.
 */
export default class WrapRigidBody extends RigidBody {
    constructor(x, y, width, height, acceleration, maxX, maxY, vDampingRate) {
        super(x, y, width, height, acceleration, maxX, maxY, vDampingRate);
    }
    
    /**
     * Called once per update, applies border behaviour (collision).
     * This assumes that wrapping happens when the object is entirely outside of the frame.
     * Also assumes the position (this.x, this.y) is the top left of the object.
     * 
     * Does not call super.handleBorderBehaviour since we don't need collisions.
     */
    handleBorderBehaviour() {
        const canvas = {
            width: this.maxX,
            height: this.maxY
        };

        // if the right edge of the body is past the left edge of the screen
        if (this.x + this.width < 0) this.x += canvas.width + this.width;
        
        // if the left edge of the body is past the right edge of the screen
        else if (this.x > canvas.width) this.x -= canvas.width + this.width;

        // if the top edge of the body is past the bottom of the screen
        if (this.y > canvas.height) this.y -= canvas.height + this.height;

        // if the bottom edge of the body is past the top of the screen
        else if (this.y + this.height < 0) this.y += canvas.height + this.height;
    }
}