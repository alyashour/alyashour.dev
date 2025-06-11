import Rectangle from "./rectangle.js";
import Component from "./component.js";
import RigidBody from "./rigidbody.js";

export default class Projectile extends Component {
    constructor(size, x, y, maxX, maxY) {
        super(size, size, x, y);

        this.sprite = new Rectangle(size, size, "red", x, y);

        this.rigidBody = new RigidBody(x, y, size, size, 0, maxX, maxY);
        this.rigidBody.onBorderCollision = () => {
            this.gameArea.removeFromScene(this);
            delete this;
        }
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