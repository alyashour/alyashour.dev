import Component from "./component.js";

export default class Sprite extends Component {
    constructor(width, height, color, x, y, image_path) {
        super(width, height, color, x, y);

        this.image = new Image();
        this.image.src = image_path;
    }

    draw() {
        this.context.drawImage(
            this.image,
            this.width / -2, this.height / -2,
            this.width, this.height
        )
    }
}