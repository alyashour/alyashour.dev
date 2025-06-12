import Rectangle from "./rectangle.js";
import Component from "./component.js";
import WrapRigidBody from "./wraprigidbody.js";
import { DEFAULT_PROJECTILE_LIFETIME } from "./defaults.js";

export default class Projectile extends Component {
    constructor(size, x, y, maxX, maxY) {
        super(size, size, x, y);

        this.sprite = new Rectangle(size, size, "white", x, y);

        this.rigidBody = new WrapRigidBody(x, y, size, size, 0, maxX, maxY);
        this.rigidBody.onCollision = (other) => {
            if (other.constructor?.name === 'Asteroid') {
                clearTimeout(this.lifetimeTimeout);
                this.deleteSelf();
            }
        };

        // set timout
        this.lifetimeTimeout = setTimeout(() => {
            this.deleteSelf();
        }, DEFAULT_PROJECTILE_LIFETIME);
    }

    // TEMPORARILY COVER THE INHERITED VALUES
    // TODO: THIS IS NOT GOOD AND SHOULD BE REMOVED
    // I just haven't seperated rigidbodies and components cleanly yet, will do soon.
    get x() {
        return this.rigidBody?.x || 0;
    }

    set x(val) {
        if (this.rigidBody) this.rigidBody.x = val;
    }

    get y() {
        return this.rigidBody?.y || 0;
    }

    set y(val) {
        if (this.rigidBody) this.rigidBody.y = val;
    }

    update() {
        this.rigidBody.update();
    }

    draw() {
        this.sprite.draw();
    }
} 