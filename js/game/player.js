import Component from "./component.js";
import Sprite from "./sprite.js";
import Rectangle from "./rectangle.js";

export default class Player extends Component {
    constructor(width, height, color, speed, rotationSpeed, x=0, y=0, image_path=null) {
        super(width, height, color, x, y);

        this.speed = speed;
        this.rotationSpeed = rotationSpeed

        if (image_path) {
            this.sprite = new Sprite(width, height, color, x, y, image_path);
        } else {
            this.sprite = new Rectangle(width, height, color, x, y, image_path);
        }
    }

    update() {
        const keys = this.gameArea.keys;
        if (keys['ArrowUp']) {
            this.x += this.speed * Math.sin(this.angle);
            this.y -= this.speed * Math.cos(this.angle);
        }
        if (keys['ArrowDown']) {
            this.x -= this.speed * Math.sin(this.angle);
            this.y += this.speed * Math.cos(this.angle);
        }
        if (keys['ArrowLeft']) this.angle -= this.rotationSpeed;
        if (keys['ArrowRight']) this.angle += this.rotationSpeed;
    }

    draw() {
        this.sprite.draw();
    }
}