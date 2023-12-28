class EB_Sprite {
    constructor({
      position,
      angle = 0,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 }
    }) {
      this.position = position
      this.angle = angle
      this.width = 50
      this.height = 150
      this.image = new Image()
      this.image.src = imageSrc
      this.scale = scale
      this.framesMax = framesMax
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.offset = offset
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
      this.draw()
      this.animate()
    }
  }