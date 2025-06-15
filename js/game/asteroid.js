import Sprite from "./engine/sprite.js";
import Component from "./engine/component.js";
import { getRandomElement, randomInt } from "./engine/util.js";
import WrapRigidBody from "./engine/wraprigidbody.js";
import { ASTEROID_MIN_SIZE } from "./defaults.js";
import { createRandomAsteroid } from "./util.js";

const VARIANTS = [
    {
        imagePath: "/img/asteroid1.svg"
    },
    {
        imagePath: "/img/asteroid2.svg"
    },
    {
        imagePath: "/img/asteroid3.svg"
    }
]

export default class Asteroid extends Component {
    /**
     * Creates an asteroid
     * @param {number} size 
     * @param {number} x 
     * @param {number} y 
     * @param {number} variant 
     */
    constructor(size, x, y, maxX, maxY, variant=null) {
        super(size, size, x, y);

        // set variant randomly if not provided
        if (!variant) this.variant = getRandomElement(VARIANTS);
        else {
            this.variant = VARIANTS[variant];
        }

        // set size
        this.size = size;

        // set sprite
        this.sprite = new Sprite(size, size, x, y, this.variant.imagePath);
        
        // set rigidbody
        this.rigidBody = new WrapRigidBody(x, y, size, size, 0, maxX, maxY);
        this.rigidBody.onCollision = (other) => {
            if (other.constructor.name === 'Projectile') {
                this.splitUp();
                this.deleteSelf();
            }
        };
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

    /**
     * Called on being struck by a projectile.
     * The asteroid splits up into a number of smaller asteroids.
     * 
     * The size of the smaller ones is always the minimum 
     */
    splitUp() {
        if (this.size <= ASTEROID_MIN_SIZE * 2) return; // dont do anything if small

        // otherwise spawn some number of asteroids
        const numOfChildren = randomInt(1, this.size / ASTEROID_MIN_SIZE);
        
        for (let i = 0; i < numOfChildren; i++) {
            if (!this.gameArea.canvas) throw new Error("Canvas is null!");

            // create new asteroid
            const newAstr = createRandomAsteroid(this.gameArea.canvas, ASTEROID_MIN_SIZE, this.x, this.y);
            this.gameArea.addToScene(newAstr);
        }
    }

    update() {
        this.rigidBody.update();
    }

    draw() {
        this.sprite.draw();
    }
}