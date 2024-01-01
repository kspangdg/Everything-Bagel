class EB_Player extends EB_Sprite {
    constructor({
      position,
      width,
      height,
      velocity = {x: 0, y: 0},
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
      collisionBox = {
        active: false,
        offset: {x: 0, y: 0},
        width: 0,
        height : 0
      },
      hitBox = {
        active: false,
        offset: {x: 0, y: 0},
        width: 0,
        height : 0
      },
      sprites
    }) {
      super({
        position,
        width,
        height,
        imageSrc,
        scale,
        framesMax,
        offset,
        collisionBox
      })
  
      this.velocity = velocity
      this.hitBox = hitBox
      this.width = width
      this.height = height
      this.health = 100
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.sprites = sprites
      this.dead = false
      this.flip = false
      this.jump = false
      this.attack = false
      this.fall = false
  
      for (const sprite in this.sprites) {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
      }
    }
  
    update() {
      this.draw()
      let x = this.position.x - this.offset.x + this.hitBox.offset.x;
      let y = this.position.y - this.offset.y + this.hitBox.offset.y;

      // Hit box
      if ((this.hitBox.width > 0 || this.hitBox.height > 0) && this.hitBox.active) {
        if (!this.flip) {
          x = (this.position.x - this.offset.x) + (this.image.width / this.framesMax  * this.scale) - this.hitBox.offset.x - this.hitBox.width;
        }
        // Get outline
        this.hitBox['left'] = x;
        this.hitBox['top'] = y;
        this.hitBox['right'] = x + this.hitBox.width;
        this.hitBox['bottom'] = y + this.hitBox.height;


        // Draw rectangle
        game.context.beginPath();
        game.context.rect( x, y, this.hitBox.width, this.hitBox.height);
        if (game.debug) game.context.stroke();

      }
      // fill
      game.context.beginPath();
      game.context.rect( this.collisionBox.left, this.collisionBox.top - 30, this.collisionBox.width / 100 * this.health, 5);
      game.context.fillStyle = "red";
      game.context.fill();

      // health bar
      game.context.beginPath();
      game.context.rect(this.collisionBox.left, this.collisionBox.top - 30, this.collisionBox.width, 5);
      game.context.stroke();





      if (!this.dead) this.animate()
   
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }

    switchSprite(sprite) {
      switch (sprite) {
        case 'idle_right':
          if (this.image !== this.sprites.idle_right.image) {
            this.image = this.sprites.idle_right.image
            this.framesMax = this.sprites.idle_right.framesMax
            this.framesCurrent = 0
          }
          break
        case 'idle_left':
          if (this.image !== this.sprites.idle_left.image) {
            this.image = this.sprites.idle_left.image
            this.framesMax = this.sprites.idle_left.framesMax
            this.framesCurrent = 0
          }
          break
        case 'run_left':
          if (this.image !== this.sprites.run_left.image) {
            this.image = this.sprites.run_left.image
            this.framesMax = this.sprites.run_left.framesMax
            this.framesCurrent = 0
          }
          break
        case 'run_right':
            if (this.image !== this.sprites.run_right.image) {
                this.image = this.sprites.run_right.image
                this.framesMax = this.sprites.run_right.framesMax
                this.framesCurrent = 0
            }
            break
        case 'Jump_left':
            if (this.image !== this.sprites.Jump_left.image) {
                this.image = this.sprites.Jump_left.image
                this.framesMax = this.sprites.Jump_left.framesMax
                this.framesCurrent = 0
            }
            break
        case 'Jump_right':
            if (this.image !== this.sprites.Jump_right.image) {
                this.image = this.sprites.Jump_right.image
                this.framesMax = this.sprites.Jump_right.framesMax
                this.framesCurrent = 0
            }
            break
        case 'Fall_left':
            if (this.image !== this.sprites.Fall_left.image) {
                this.image = this.sprites.Fall_left.image
                this.framesMax = this.sprites.Fall_left.framesMax
                this.framesCurrent = 0
            }
            break
        case 'Fall_right':
            if (this.image !== this.sprites.Fall_right.image) {
                this.image = this.sprites.Fall_right.image
                this.framesMax = this.sprites.Fall_right.framesMax
                this.framesCurrent = 0
            }
            break
        case 'attack_left':
            if (this.image !== this.sprites.attack_left.image) {
                this.image = this.sprites.attack_left.image
                this.framesMax = this.sprites.attack_left.framesMax
                this.framesCurrent = 0
            }
            break
        case 'attack_right':
            if (this.image !== this.sprites.attack_right.image) {
                this.image = this.sprites.attack_right.image
                this.framesMax = this.sprites.attack_right.framesMax
                this.framesCurrent = 0
            }
            break
        case 'dead_left':
            if (this.image !== this.sprites.dead_left.image) {
                this.image = this.sprites.dead_left.image
                this.framesMax = this.sprites.dead_left.framesMax
                this.framesCurrent = 0
            }
            break
        case 'dead_right':
            if (this.image !== this.sprites.dead_right.image) {
                this.image = this.sprites.dead_right.image
                this.framesMax = this.sprites.dead_right.framesMax
                this.framesCurrent = 0
            }
            break
      }
    }
  }