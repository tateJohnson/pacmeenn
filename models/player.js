export class Player {
    c;
    constructor({ position, velocity, canvasC }) {
      this.position = position
      this.startingPosition = position
      this.velocity = velocity
      this.c = canvasC
      this.radius = 15
      this.radians = 0.75
      this.openRate = 0.12
      this.rotation = 0
      this.lives = 2
      this.pelletsEaten = 0
      this.isDead = false
    }
    draw() {
      this.c.save()
      this.c.translate(this.position.x, this.position.y)
      this.c.rotate(this.rotation)
      this.c.translate(-this.position.x,-this.position.y)
      this.c.beginPath()
      this.c.arc(this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians)
      this.c.lineTo(this.position.x, this.position.y)
      this.c.fillStyle = 'yellow'
      this.c.fill()
      this.c.closePath()
      this.c.restore()
    }
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

      if (this.radians < 0 || this.radians > 0.75) this.openRate = -this.openRate

      this.radians += this.openRate
    }

    addlife() {
      this.lives += 1
    }

    die() {
      this.lives -= 1
      this.isDead = true
    }

    eatPellet() {
      this.pelletsEaten += 1;
    }

    getPellet() {
      return this.pelletsEaten;
    }
  }