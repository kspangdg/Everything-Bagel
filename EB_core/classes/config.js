/**
 * Configs game canvas and fps.
 *
 * @param {dom element} canvas - Create or point to canvas element (e.g. document.createElement("canvas"))
 * @param {int} width - Width of the canvas
 * @param {int} height - Height of the canvas
 * @param {int} interval - Game Loop speed
 */

class EB_Config {
    constructor(canvas, width, height, interval) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.interval = interval;
        this.context = this.canvas.getContext("2d");
    }

    start() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(update, this.interval);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);        
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}