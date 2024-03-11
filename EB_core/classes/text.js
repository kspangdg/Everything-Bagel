/**
 * A class for creating text
 * 
 * @class EB_Text
 * @param {object} position - The position of the sprite in X and Y coordinates
 * @param {int} size - The size of the text
 * @param {string} color - The color of the text
 * @param {string} text - The text to be displayed
 */

class EB_Text {
    constructor({position = {x: 0, y: 0}, size = 16, color = 'black', text = '', align = 'center'}) {
        this.position = position;
        this.size = size;
        this.color = color;
        this.text = text;
        this.align = 'center';
        this.display = false;
    }
  
    draw() {
        if (this.text != '' && this.display) {
            game.context.font = this.size + "px Arial";
            game.context.textAlign = this.align;
            game.context.fillStyle = this.color;
            game.context.fillText(this.text, this.position.x, this.position.y); 
        }
    }

    update() {
      this.draw()
    }
  }