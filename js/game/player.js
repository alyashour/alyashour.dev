import Component from "./component.js";
import Sprite from "./sprite.js";
import RigidBody from "./rigidbody.js";
import Projectile from "./projectile.js";
import {
    DEFAULT_PROJECTILE_SIZE,
    DEFAULT_PROJECTILE_SPEED
} from "./defaults.js";

export default class Player extends Component {
    constructor(width, height, acceleration, rotationSpeed, maxX, maxY, x = 0, y = 0) {
        super(width, height, x, y);

        // set up rigidBody
        this.rigidBody = new RigidBody(x, y, width, height, acceleration, maxX, maxY, 0.997);
        this.rigidBody.onBorderCollision = () => {
            this.rigidBody.vx = 0;
            this.rigidBody.vy = 0;
        }

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
        let keys = this.gameArea.keys;

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
        if (keys[' ']) {
            this.gameArea.keys[' '] = false; // de-bounce (consume) the event
            this.#shoot();
        }

        this.rigidBody.update();
    }

    draw() {
        this.sprite.draw();
    }

    #shoot() {
        // determine projectile position
        const centerx = this.x + this.width / 2;
        const centery = this.y + this.height / 2;
        const projectilex = centerx;
        const projectiley = centery;

        // create the projectile
        const projectile = new Projectile(
            DEFAULT_PROJECTILE_SIZE,
            projectilex, projectiley,
            this.maxX, this.maxY
        );

        // set the projectiles velocity
        projectile.rigidBody.vx = DEFAULT_PROJECTILE_SPEED * Math.cos(this.angle - Math.PI / 2);
        projectile.rigidBody.vy = DEFAULT_PROJECTILE_SPEED * Math.sin(this.angle - Math.PI / 2);

        // add it to scene and physics
        this.gameArea.addToScene(projectile);
    }
}