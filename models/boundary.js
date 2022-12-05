export class Boundary {
    static width = 40
    static height = 40
    canvasContext;

    constructor({ position, image, canvasContext }) {
      this.position = position
      this.width = 40
      this.height = 40
      this.image = image
      this.canvasContext = canvasContext
    }
    draw() {
      this.canvasContext.drawImage(this.image, this.position.x, this.position.y)
    }
  }