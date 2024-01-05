class EB_Sprite {
    constructor({
      position,
      angle = 0,
      width,
      height,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
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
      this.scale = scale;
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
      this.offset = offset;
      this.collisionBox = collisionBox;
    }
  
    draw() {
      let x = this.position.x - this.offset.x;
      let y = this.position.y - this.offset.y;
      if (this.angle) {
        game.context.save();
        game.context.translate((this.image.width / this.framesMax) / 2, this.image.height / 2);
        game.context.rotate(this.angle);
        x = (this.position.x * -1) - ((this.image.width / this.framesMax) / 2);
        y = (this.position.y * -1) - (this.image.height / 2);
      }
        game.context.drawImage(
          this.image,
          this.framesCurrent * (this.image.width / this.framesMax),
          0,
          this.image.width / this.framesMax,
          this.image.height,
          x,
          y,
          (this.image.width / this.framesMax) * this.scale,
          this.image.height * this.scale
        )
      if (this.angle) {
        game.context.restore();
      }
      if (game.debug) {
        game.context.beginPath();
        game.context.rect(
          x,
          y,
          (this.image.width / this.framesMax) * this.scale, 
          this.image.height * this.scale
        );
        game.context.stroke();
      }
      if (this.collisionBox.width > 0 || this.collisionBox.height > 0) {
        this.collisionBox.active = true;
        // Get outline
        this.collisionBox['left'] = x + this.collisionBox.offset.x;
        this.collisionBox['top'] = y + this.collisionBox.offset.y;
        this.collisionBox['right'] = (x + this.collisionBox.offset.x) + this.collisionBox.width;
        this.collisionBox['bottom'] = (y + this.collisionBox.offset.y) + this.collisionBox.height;

        // Draw rectangle
        game.context.beginPath();
        game.context.rect(
          x + this.collisionBox.offset.x,
          y + this.collisionBox.offset.y,
          this.collisionBox.width, 
          this.collisionBox.height
        );
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
  
    update() {
      if (this.imageLoaded) {
        this.draw()
        this.animate()
      }
    }
  }