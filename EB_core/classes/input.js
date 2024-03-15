/**
 * Adds event listener to spesifided keys, tracks mouse, creates object tracking key press.
 *
 * @class EB_Input
 * @param {Array} keys - Array of keys to track (e.g. ["ArrowLeft", "ArrowRight"])
 * @param {Boolean} mouse - Track mouse position and click
 */

class EB_Input {
    constructor(keys, mouse) {
        this.keys = {};
        this.mouse = {x: 0, y: 0, clicked: false};
        this.track_mouse = mouse;
        // loop through keys array and add to keys object
        if (keys.langth > 0) {
            for (const key in keys) {
                this.keys[keys[key]] = { pressed: false };
            }
            window.addEventListener('keydown', (event) => {
                let eventKey = event.key;
                if (game.debug) console.log(eventKey);
                if (eventKey == " ") eventKey = "Space";
                // loop through keys object
                for (const key in this.keys) {
                    // if key is pressed
                    if (eventKey === key) {
                        // set pressed to true
                        this.keys[key].pressed = true;
                    }
                }
    
            })
            window.addEventListener('keyup', (event) => {
                let eventKey = event.key;
                if (eventKey == " ") eventKey = "Space";
                // loop through keys object
                for (const key in this.keys) {
                    // if key is pressed
                    if (eventKey === key) {
                        // set pressed to false
                        this.keys[key].pressed = false;
                    }
                }
            })
        }
        if (this.track_mouse) {
            game.canvas.addEventListener('mousemove', (event) => {
                let rect = game.canvas.getBoundingClientRect();
                this.mouse.x = event.clientX - rect.left;
                this.mouse.y = event.clientY - rect.top;
            })
            // game.canvas.addEventListener('mousedown', (event) => {
            //     this.mouse.clicked = true;
            // })
            game.canvas.addEventListener('mouseup', (event) => {
                this.mouse.clicked = true;
            })
        }
    }
    update() {   
        this.mouse.clicked = false;
    }
}