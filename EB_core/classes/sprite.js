/**
 * A class for creating sprites
 * 
 * @class EB_Sprite
 * 
 * @param {object} position - The position of the sprite in X and Y coordinates
 * @param {int} angle - The angle of the sprite in degrees
 * @param {int} width - The width of the sprite
 * @param {int} height - The height of the sprite
 * @param {string} imageSrc - The source of the image for the sprite
 * @param {int} framesMax - The number of frames in the sprite image
 * @param {object} collisionBox - The collision box for the sprite
 * @param {bool} collisionBox.active - If the collision box is active
 * @param {object} collisionBox.offset - The offset of the collision box in X and Y coordinates
 * @param {int} collisionBox.width - The width of the collision box
 * @param {int} collisionBox.height - The height of the collision box
 * 
 */

class EB_Sprite {
    constructor({
      position = {x: 0, y: 0},
      angle = 0,
      size = {w: 0, h: 0},
      imageSrc,
      framesMax = 1,
      collisionBox = {
        active: false,
        offset: {x: 0, y: 0},
        width: 0,
        height : 0
      }
    }) {
      this.position = position;
      this.angle = angle;
      this.size = size;
      this.image = new Image();
      this.imageLoaded = false;
      this.image.onload = () => {
        this.imageLoaded = true;
      }
      this.image.src = imageSrc;
      this.framesMax = framesMax;
      this.framesCurrent = 0;
      this.framesElapsed = 0;
      this.framesHold = 5;
      this.collisionBox = collisionBox;
      this.flip = false;
    }
  
    draw() {
      // if (this.angle) {
      //   game.context.save();
      //   game.context.translate((this.image.width / this.framesMax) / 2, this.image.height / 2);
      //   game.context.rotate(this.angle);
      //   x = (this.position.x * -1) - ((this.image.width / this.framesMax) / 2);
      //   y = (this.position.y * -1) - (this.image.height / 2);
      // }
      if (this.flip) {
        game.context.save();
        game.context.translate(this.position.x + (this.image.width / this.framesMax), this.position.y);
        game.context.scale(-1, 1);
      }
      game.context.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        (this.flip ? 0 : this.position.x),
        (this.flip ? 0 : this.position.y),
        (this.image.width / this.framesMax),
        this.image.height
      )
      if (this.flip) game.context.restore()
      if (game.debug) debug();
      if (this.collisionBox.active) {
        this.update_collision_box();
        game.context.beginPath();
        game.context.rect(this.collisionBox.x, this.collisionBox.y, this.collisionBox.width, this.collisionBox.height);
        if (game.debug) game.context.stroke();
      }
    }
  
    animate() {
      this.framesElapsed++
      if (this.framesElapsed % this.framesHold === 0) {
          if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++
          } else {
            this.framesCurrent = 0
          }
      }
    }

    debug() {
      game.context.beginPath();
      game.context.rect(
        this.position.x,
        this.position.y,
        (this.image.width / this.framesMax), 
        this.image.height
      );
      game.context.stroke();
    }

    update_collision_box() {
      this.collisionBox['x'] = this.position.x + this.collisionBox.offset.x;
      this.collisionBox['y'] = this.position.y + this.collisionBox.offset.y;
      if (this.collisionBox.width == 0 || this.collisionBox.height == 0) {
        this.collisionBox.width = this.size.w;
        this.collisionBox.height = this.size.h;
      }
      this.collisionBox['left'] = this.position.x + this.collisionBox.offset.x;
      this.collisionBox['top'] = this.position.y + this.collisionBox.offset.y;
      this.collisionBox['right'] = (this.position.x + this.collisionBox.offset.x) + this.collisionBox.width;
      this.collisionBox['bottom'] = (this.position.y + this.collisionBox.offset.y) + this.collisionBox.height;
    }
  
    update() {
      if (this.imageLoaded) {
        this.draw()
        this.animate()
      }
    }
  }