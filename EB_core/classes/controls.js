/**
 * Adds event listener to spesifided keys, tracks mouse, creates object tracking key press.
 *
 * @param {Array} keys - Array of keys to track (e.g. ["ArrowLeft", "ArrowRight"])
 * @param {Boolean} mouse - Track mouse position and click
 */

class EB_Controls {
    constructor(keys, mouse) {
        this.keys = {};
        this.mouse = {x: 0, y: 0, clicked: false};
        this.track_mouse = mouse;
        // loop through keys array and add to keys object
        for (const key in keys) {
            this.keys[keys[key]] = { pressed: false };
            
        }
        window.addEventListener('keydown', (event) => {
            // loop through keys object
            for (const key in this.keys) {
                // if key is pressed
                if (event.key === key) {
                    // set pressed to true
                    this.keys[key].pressed = true;
                }
            }

        })
        window.addEventListener('keyup', (event) => {
            // loop through keys object
            for (const key in this.keys) {
                // if key is pressed
                if (event.key === key) {
                    // set pressed to false
                    this.keys[key].pressed = false;
                }
            }
        })
        if (this.track_mouse) {
            window.addEventListener('mousemove', (event) => {
                this.mouse.x = event.clientX;
                this.mouse.y = event.clientY;
            })
            window.addEventListener('mousedown', (event) => {
                this.mouse.clicked = true;
            })
            window.addEventListener('mouseup', (event) => {
                this.mouse.clicked = false;
            })
        }
    }
}