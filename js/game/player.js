import Component from "./component.js";
import Sprite from "./sprite.js";
import Rectangle from "./rectangle.js";
import RigidBody from "./rigidbody.js";

export default class Player extends Component {
    constructor(width, height, acceleration, rotationSpeed, x=0, y=0) {
        super(width, height, "", x, y);
        this.rigidBody = new RigidBody(x, y, width, height, acceleration, 0.999);
        this.rotationSpeed = rotationSpeed;
        this.sprite = new Sprite(width, height, x, y, "/img/asteroids_player_white.svg");
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

        // Get movement inputs and apply them
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

        // shoot when the spacebar is pressed
        if (keys['Spacebar']) {
            alert('shoot!')
        }

        this.rigidBody.update();
    }

    draw() {
        this.sprite.draw();
    }
}