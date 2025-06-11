import Component from "./component.js";

export default class Sprite extends Component {
    constructor(width, height, x, y, image_path) {
        super(width, height, x, y);

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