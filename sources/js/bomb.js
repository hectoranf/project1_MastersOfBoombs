class Bomb {
      constructor(ctx, coordX, coordY, tileSize) {
            this.ctx = ctx

            this.coord = {
                  x: coordX,
                  y: coordY
            }
            this.width = tileSize
            this.height = tileSize
            this.posx = this.coord.x * this.width
            this.posY = this.coord.y * this.height

            this.img = new Sprite(this.ctx, 320, 'Bomb.png', 3, this.width, this.height)
            this.timer = 0

            this.isExploding = false
            this.isExploded = false
      }

      update(deltaTime) {
            this.updateTimer(deltaTime)
            if (!this.isExploding) {
                  this.img.draw(this.timer, this.posx, this.posY)
                  this.explote()
            } else {
                  //Dibuja esplosion
                  this.timer > 1000 ? this.isExploded = true : null
            }
      }

      updateTimer(deltaTime) {
            this.timer + deltaTime >= 10000 ? this.timer = 0 : this.timer += deltaTime
      }

      explote() {
            if (this.timer > 3000) {
                  this.isExploding = true
                  this.timer = 0
            }
      }
}
