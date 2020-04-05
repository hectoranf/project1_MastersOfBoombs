class Player {

      constructor(ctx, tileSize, tileX, tileY) {
            this.ctx = ctx
            this.tileSize = tileSize

            //Collider position
            this.width = this.tileSize * 0.7
            this.height = this.width
            this.posX = tileX * this.tileSize + (this.tileSize - this.width) / 2
            this.posY = tileY * this.tileSize + (this.tileSize - this.height) / 2

            //Coordenadas en el escenario
            this.tileCoord = {
                  row: tileX,
                  col: tileY
            }

            //Las colisiones se hara acorde a un cuadrado de lado igual que el ancho
            this.imgProperties = {
                  width: this.tileSize,
                  height: this.tileSize * 1.25,
                  posX: this.posX - (this.tileSize - this.width) / 2,
                  posY: this.posY - this.tileSize * 0.55
            }

            this.direction = ''
            this.speed = 3

            //IMAGEN
            this.image = new Image()
            this.image.src = './images/player/PlayerFull.png'
            this.spritePosX = 0
            this.spritePosY = 0
            this.image.onload = () => {
                  this.spriteWidth = this.image.width / 8
                  this.spriteHeight = this.image.height / 3
            }
            this.frameDirection = 'DOWN'
      }


      update() {
            this.draw()
            this.move()
      }

      draw() {
            //pintando el collider
            this.ctx.fillStyle = 'tomato'
            this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
            //Image
            this.drawAnimation()
      }

      changeDirection(direction) {
            this.direction = direction
      }

      move() {
            //Desplaza según la dirección
            switch (this.direction) {
                  case 'UP':
                        this.posY -= this.speed
                        this.imgProperties.posY -= this.speed
                        this.updateCoords()
                        break
                  case 'DOWN':
                        this.posY += this.speed
                        this.imgProperties.posY += this.speed
                        this.updateCoords()
                        break
                  case 'LEFT':
                        this.posX -= this.speed
                        this.imgProperties.posX -= this.speed
                        this.updateCoords()
                        break
                  case 'RIGHT':
                        this.posX += this.speed
                        this.imgProperties.posX += this.speed
                        this.updateCoords()
                        break
                  default:
                        break
            }

      }

      updateCoords() {
            this.tileCoord.row = Math.round(this.posY / this.tileSize)
            this.tileCoord.col = Math.round(this.posX / this.tileSize)
      }


      //se usa en las colisiones para evitar que el jugador entre en un collider
      translate(newPosX, newPosY) {
            this.posX = newPosX
            this.imgProperties.posX = newPosX - (this.tileSize - this.width) / 2
            this.posY = newPosY
            this.imgProperties.posY = newPosY - this.tileSize * 0.55
      }

      drawAnimation() {
            this.frameDirection != this.direction ? this.frameDirection = this.direction : null

            switch (this.frameDirection) {
                  case 'UP':
                        this.spritePosY = 0
                        this.spritePosX = 4
                        break
                  case 'DOWN':
                        this.spritePosY = 0
                        this.spritePosX = 0
                        break
                  case 'LEFT':
                        this.spritePosX = 4
                        this.spritePosY = this.spriteHeight
                        break
                  case 'RIGHT':
                        this.spritePosX = 0
                        this.spritePosY = this.spriteHeight
                        break
                  default:
                        break
            }
            this.ctx.drawImage(this.image,
                  this.spritePosX * this.spriteWidth,
                  this.spritePosY,
                  this.spriteWidth,
                  this.spriteHeight,
                  this.imgProperties.posX,
                  this.imgProperties.posY,
                  this.imgProperties.width,
                  this.imgProperties.height)

      }

}