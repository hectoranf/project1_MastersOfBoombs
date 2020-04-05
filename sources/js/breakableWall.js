class BreakableWall extends Tile {
      constructor(ctx, size, posX, posY) {
            super(ctx, size, posX, posY)

            this.tile = undefined
            this.brokenImage = undefined
            this.initTile()
      }

      initTile() {
            this.tile = new Image()
            this.tile.src = './images/breakableWall.png'

            this.brokenImage = new Image()
            this.brokenImage.src = './images/floor.png'
      }

      // update() {
      //       this.draw()
      // }

      // draw() {
      //       this.ctx.drawImage(this.tile, this.posX, this.posY, this.size, this.size)
      // }
}