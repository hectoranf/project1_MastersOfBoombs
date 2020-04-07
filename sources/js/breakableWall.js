class BreakableWall extends Tile {
      constructor(ctx, size, posX, posY) {
            super(ctx, size, posX, posY)

            this.tile = new Sprite(ctx, 100, 'breakableWallSprites.png', 9, size, size)

            //Propiedades de paredes
            this.isBlocking = true
            this.isBreaking = false
            this.isDone = false
            this.frameTimer = 0
            this.cosa = 9
      }

      draw() {
            if (!this.isBreaking) {
                  this.tile.draw(1, this.posX, this.posY)
            } else if (!this.isDone) {
                  this.tile.draw(this.frameTimer, this.posX, this.posY)
                  if (this.frameTimer >= 700) {
                        this.isDone = true
                        this.isBlocking = false
                  } else this.frameTimer += 50

            } else {
                  this.tile.draw(1, this.posX, this.posY)
            }
      }


}