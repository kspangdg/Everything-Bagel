class EB_Sprite {
    constructor({
      position = {x: 0, y: 0},
      angle = 0,
      width,
      height,
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
      this.width = width;
      this.height = height;
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
    }
  
    draw() {
      // if (this.angle) {
      //   game.context.save();
      //   game.context.translate((this.image.width / this.framesMax) / 2, this.image.height / 2);
      //   game.context.rotate(this.angle);
      //   x = (this.position.x * -1) - ((this.image.width / this.framesMax) / 2);
      //   y = (this.position.y * -1) - (this.image.height / 2);
      // }
      game.context.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x,
        this.position.y,
        (this.image.width / this.framesMax),
        this.image.height
      )
      // if (this.angle) {
      //   game.context.restore();
      // }
      if (game.debug) {
        game.context.beginPath();
        game.context.rect(
          this.position.x,
          this.position.y,
          (this.image.width / this.framesMax), 
          this.image.height
        );
        game.context.stroke();
      }
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

    update_collision_box() {
      this.collisionBox['x'] = this.position.x + this.collisionBox.offset.x;
      this.collisionBox['y'] = this.position.y + this.collisionBox.offset.y;
      if (this.collisionBox.width == 0 || this.collisionBox.height == 0) {
        this.collisionBox.width = this.width;
        this.collisionBox.height = this.height
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