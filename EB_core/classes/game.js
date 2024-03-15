/**
 * Configures game canvas, fps, basic meta.
 *
 * @class EB_Config
 * @param {dom element} canvas - Create or point to canvas element (e.g. document.createElement("canvas"))
 * @param {int} width - Width of the canvas
 * @param {int} height - Height of the canvas
 */

class EB_Game {
    constructor(canvas, width, height, meta = {}) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.context = this.canvas.getContext("2d");
        this.level = 1,
        this.scene = 1,
        this.mode = 1, // 1 = easy, 2 = medium, 3 = hard
        this.debug = false;
        this.mute = false;
        this.meta = meta;
    }

    start() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);        
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    scene_change(scene) {
        if (this.track_mouse) input.mouse.clicked = false;
        this.scene = scene;
    }
    level_change(level) {
        if (this.track_mouse) input.mouse.clicked = false;
        this.level = level;
    }
}