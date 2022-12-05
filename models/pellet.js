    export class Pellet {
    c;
    constructor({ position, can }) {
      this.position = position
      this.radius = 3
      this.c = can
      this.color = 'white'
      this.active = true
    }

    draw() {
      this.c.beginPath()
      this.c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
      this.c.fillStyle = this.color
      this.c.fill()
      this.c.closePath()
    }

    hide() {
      this.color = 'black'
      this.active = false
    }

    respawn() {
      this.active = true
      this.color = 'white'
    }
  }