import Component from "./component.js";
import Sprite from "./sprite.js";
import Rectangle from "./rectangle.js";
import RigidBody from "./rigidbody.js";

export default class Player extends Component {
    constructor(width, height, color, acceleration, rotationSpeed, image_path=null, vDampingRate=0.999, x=0, y=0) {
        super(width, height, color, x, y);
        this.rigidBody = new RigidBody(x, y, width, height, acceleration, vDampingRate);
        this.rotationSpeed = rotationSpeed;

        if (image_path) {
            this.sprite = new Sprite(width, height, color, x, y, image_path);
        } else {
            this.sprite = new Rectangle(width, height, color, x, y, image_path);
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
        const keys = this.gameArea.keys;

        // Get inputs and apply them
        if (keys['ArrowUp']) {
            this.rigidBody.vx += this.rigidBody.acceleration * Math.sin(this.angle);
            this.rigidBody.vy -= this.rigidBody.acceleration * Math.cos(this.angle);
        }
        if (keys['ArrowDown']) {
            this.rigidBody.vx -= this.rigidBody.acceleration * Math.sin(this.angle);
            this.rigidBody.vy += this.rigidBody.acceleration * Math.cos(this.angle);
        }
        if (keys['ArrowLeft']) this.angle -= this.rotationSpeed;
        if (keys['ArrowRight']) this.angle += this.rotationSpeed;

        this.rigidBody.update();
    }

    draw() {
        this.sprite.draw();
    }
}