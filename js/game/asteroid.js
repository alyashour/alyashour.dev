import Component from "./component.js";
import RigidBody from "./rigidbody.js";
import Sprite from "./sprite.js";
import { getRandomElement } from "./util.js";

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
        this.rigidBody = new RigidBody(x, y, size, size, 0, maxX, maxY);
        this.rigidBody.onCollision = (other) => {
            console.log(typeof other);
        };
    }

    update() {
        this.rigidBody.update();
    }

    draw() {
        this.sprite.draw();
    }
}