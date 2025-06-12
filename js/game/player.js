import Sprite from "./engine/sprite.js";
import Component from "./engine/component.js";
import Projectile from "./projectile.js";
import {
    DEFAULT_SHOOT_SPEED,
    PLAYER_ACCELERATION,
    PLAYER_ROTATION_SPEED,
    PLAYER_START_HEALTH,
    V_DAMPING_RATE
} from "./defaults.js";
import WrapRigidBody from "./engine/wraprigidbody.js";

export default class Player extends Component {
    constructor(width, height, maxX, maxY) {
        super(width, height, 0, 0);
        this.rotationSpeed = PLAYER_ROTATION_SPEED;
        this.health = PLAYER_START_HEALTH;
        
        // set up rigidBody
        // compute center of area for starting position
        const x = this.gameArea.canvas.width / 2 - this.width / 2;
        const y = this.gameArea.canvas.height / 2 - this.height / 2;
        this.rigidBody = new WrapRigidBody(
            x, y, 
            width, height, 
            PLAYER_ACCELERATION, 
            maxX, maxY, 
            V_DAMPING_RATE
        );
        this.rigidBody.onCollision = (other) => {
            if (other.constructor?.name === 'Asteroid') {
                alert('you died!');
                this.deleteSelf();
            }
        };

        // set up sprite
        this.sprite = new Sprite(width, height, 0, 0, "/img/asteroids_player_white.svg");
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
        const offsetx = this.height / 2 * Math.cos(this.angle - Math.PI / 2)
        const offsety = this.height / 2 * Math.sin(this.angle - Math.PI / 2)
        const projectilex = centerx + offsetx;
        const projectiley = centery + offsety;
        
        // create the projectile
        const projectile = new Projectile(            
            projectilex, projectiley,
            this.rigidBody.maxX, this.rigidBody.maxY
        );

        // set the projectiles velocity
        projectile.rigidBody.vx = DEFAULT_SHOOT_SPEED * Math.cos(this.angle - Math.PI / 2);
        projectile.rigidBody.vy = DEFAULT_SHOOT_SPEED * Math.sin(this.angle - Math.PI / 2);

        // add it to scene and physics
        this.gameArea.addToScene(projectile);
    }
}