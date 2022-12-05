export class Ghost {
    static speed = 2
    canvasGhost;

    constructor({ position, velocity, color = 'red', canvasGhost }) {
      this.position = position
      this.velocity = velocity
      this.radius = 15
      this.color = color
      this.prevCollisions = []
      this.speed = 2
      this.scared = false
      this.canvasGhost = canvasGhost;

    }
    draw() {
      this.canvasGhost.beginPath()
      this.canvasGhost.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
      this.canvasGhost.fillStyle = this.scared ? 'blue' : this.color
      this.canvasGhost.fill()
      this.canvasGhost.closePath()
    }
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

    }
  }