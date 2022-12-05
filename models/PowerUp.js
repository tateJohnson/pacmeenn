export class PowerUp {
    canvasPowerUp;

    constructor({ position, canvasPowerUp }) {
        this.position = position
        this.radius = 8
        this.canvasPowerUp = canvasPowerUp;
    }

    draw() {
        this.canvasPowerUp.beginPath()
        this.canvasPowerUp.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        this.canvasPowerUp.fillStyle = 'white'
        this.canvasPowerUp.fill()
        this.canvasPowerUp.closePath()
    }
}