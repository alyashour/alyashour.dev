import Component from "./component.js";

export default class Rectangle extends Component {
    /**
     * Creates a new rectangle where x, y is the position of the top-left corner.
     * @param {number} width
     * @param {number} height
     * @param {*} color 
     * @param {*} x 
     * @param {*} y 
     */
    constructor(width, height, color, x, y) {
        super(width, height, x, y);
        this.color = color;
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    }
}