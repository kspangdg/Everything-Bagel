class EB_Player extends EB_Sprite {
    constructor({
      position,
      velocity,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
      sprites
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
      this.health = 100
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.sprites = sprites
      this.dead = false
      this.flip = false
      this.jump = false
      this.fall = false
  
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
      }
    }
  }