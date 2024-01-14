/**
 * A class for creating backgrounds
 * 
 * @class EB_Background
 * 
 * @param {object} position - The position of the sprite in X and Y coordinates
 * @param {string} imageSrc - The source of the image for the sprite
 * @param {bool} loop - If the background should loop
 * @param {int} framesMax - The number of frames in the sprite image
 * 
 */
class EB_Background extends EB_Sprite {
    constructor({ position, imageSrc, loop = false, framesMax = 1,}) {
      super({ position,imageSrc,framesMax,})
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
          (this.image.width / this.framesMax),
          this.image.height
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
                (this.image.width / this.framesMax),
                this.image.height
            ); 
            game.context.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x - this.width,
                this.position.y,
                (this.image.width / this.framesMax),
                this.image.height
            );           
        }
    }
    update() {
        this.draw();
        if ((this.position.x < -(this.width) || this.position.x > this.width) && this.loop) {
            this.position.x = 0;
        }
    }
}