import Component from "./component.js";
import Rectangle from "./rectangle.js";

export default class Sprite extends Component {
    constructor(width, height, color, x, y, image_path) {
        super(width, height, color, x, y);

        this.bounding_box = new Rectangle(width, height, color, x, y);
        this.image = new Image();
        this.image.src = image_path;
    }

    draw(x, y) {
        this.context.drawImage(
            this.image,
            x || this.x, y || this.y,
            this.width, this.height
        )
    }
}