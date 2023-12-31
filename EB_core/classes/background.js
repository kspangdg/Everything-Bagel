class EB_Background extends EB_Sprite {
    constructor({
      position,
      imageSrc,
      loop = false,
      scale = 1,
      framesMax = 1,
    }) {
      super({
        position,
        imageSrc,
        scale,
        framesMax,
      })
  
      this.loop = loop
      this.width = game.width
      this.height = game.height
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
    }

    draw() {
        game.context.drawImage(
          this.image,
          this.framesCurrent * (this.image.width / this.framesMax),
          0,
          this.image.width / this.framesMax,
          this.image.height,
          this.position.x,
          this.position.y,
          (this.image.width / this.framesMax) * this.scale,
          this.image.height * this.scale
        );
        if (this.loop) {
            game.context.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x + this.width,
                this.position.y,
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale
            ); 
            game.context.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x - this.width,
                this.position.y,
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale
            );           
        }
    }
  
    update() {
        this.draw();
        if (this.position.x < -(this.width) || this.position.x > this.width) {
            this.position.x = 0;
        }
    }
}