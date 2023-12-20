class EB_Player extends EB_Sprite {
    constructor({
      position,
      velocity,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
      sprites,
    }) {
      super({
        position,
        imageSrc,
        scale,
        framesMax,
        offset
      })
  
      this.velocity = velocity
      this.width = 50
      this.height = 150
      this.lastKey
      this.health = 100
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.sprites = sprites
      this.dead = false
      this.flip = false
  
      for (const sprite in this.sprites) {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
      }
    }
  
    update() {
      this.draw()
      if (!this.dead) this.animate()
   
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
  
    // gravity function
    //   if (this.position.y + this.height + this.velocity.y >= game.canvas.height - 96) {
    //     this.velocity.y = 0
    //     this.position.y = 330
    //   } else this.velocity.y += gravity
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
      }
    }
  }