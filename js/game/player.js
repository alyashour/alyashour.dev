import Component from "./component.js";
import Sprite from "./sprite.js";
import Rectangle from "./rectangle.js";

export default class Player extends Component {
    constructor(width, height, color, acceleration, rotationSpeed, vDampingRate=0.999, x=0, y=0, image_path=null) {
        super(width, height, color, x, y);

        this.acceleration = acceleration;
        this.rotationSpeed = rotationSpeed

        if (image_path) {
            this.sprite = new Sprite(width, height, color, x, y, image_path);
        } else {
            this.sprite = new Rectangle(width, height, color, x, y, image_path);
        }

        this.vx = 0;
        this.vy = 0;
        this.vDampingRate = vDampingRate;
    }

    update() {
        const keys = this.gameArea.keys;

        // Get inputs and apply them
        if (keys['ArrowUp']) {
            this.vx += this.acceleration * Math.sin(this.angle);
            this.vy -= this.acceleration * Math.cos(this.angle);
        }
        if (keys['ArrowDown']) {
            this.vx -= this.acceleration * Math.sin(this.angle);
            this.vy += this.acceleration * Math.cos(this.angle);
        }
        if (keys['ArrowLeft']) this.angle -= this.rotationSpeed;
        if (keys['ArrowRight']) this.angle += this.rotationSpeed;

        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;

        // Apply dampening effect
        this.vx *= this.vDampingRate;
        this.vy *= this.vDampingRate;
    }

    draw() {
        this.sprite.draw();
    }
}