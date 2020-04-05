class Player {

      constructor(ctx, tileSize, tileX, tileY) {
            this.ctx = ctx
            this.tileSize = tileSize

            //Collider position
            this.width = this.tileSize * 0.8
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
                  width: this.width,
                  height: this.height * 1.25,
                  posX: this.posX,
                  posY: this.posY - this.height * 0.25

            }

            this.direction = ''
            this.speed = 3
            //Imagen
            this.sprite = new Image()
            this.sprite.src = './images/player/player.png'

      }

      update() {
            this.draw()
            this.move()
      }

      draw() {
            this.ctx.drawImage(this.sprite, this.imgProperties.posX, this.imgProperties.posY, this.imgProperties.width, this.imgProperties.height)
            //pintando el collider
            this.ctx.fillStyle = 'tomato'
            this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
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
                        break
                  case 'DOWN':
                        this.posY += this.speed
                        this.imgProperties.posY += this.speed
                        break
                  case 'LEFT':
                        this.posX -= this.speed
                        this.imgProperties.posX -= this.speed
                        break
                  case 'RIGHT':
                        this.posX += this.speed
                        this.imgProperties.posX += this.speed
                        break
                  default:
                        break
            }

      }


}