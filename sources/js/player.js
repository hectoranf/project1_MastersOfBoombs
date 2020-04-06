class Player {

      constructor(ctx, tileSize, tileX, tileY) {
            this.ctx = ctx
            this.tileSize = tileSize
            this.timer = 0

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
            this.speed = 4

            //IMAGEN

            this.animations = [
                  new Sprite(this.ctx, 120, 'player/player.png', 4, this.imgProperties.width, this.imgProperties.height, 4, 0),
                  new Sprite(this.ctx, 120, 'player/player.png', 4, this.imgProperties.width, this.imgProperties.height, 4, 1),
                  new Sprite(this.ctx, 120, 'player/player.png', 4, this.imgProperties.width, this.imgProperties.height, 4, 2),
                  new Sprite(this.ctx, 120, 'player/player.png', 4, this.imgProperties.width, this.imgProperties.height, 4, 3)
            ]
            this.currentAnimationIndex = 0

            this.frameDirection = 'DOWN'

            this.bombs = []
            this.maxBombs = 1
      }


      update(deltaTime) {
            // this.drawCollider()
            this.updateTimer(deltaTime)
            this.move(this.timer)
            this.updateBombs(deltaTime)
      }

      updateTimer(deltaTime) {
            this.timer + deltaTime >= 10000 ? this.timer = 0 : this.timer += deltaTime
      }

      drawCollider() {
            //pintando el collider
            this.ctx.fillStyle = 'tomato'
            this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
      }

      changeDirection(direction) {
            this.direction = direction
      }

      move(timer) {
            //Desplaza según la dirección
            switch (this.direction) {
                  case 'UP':
                        this.posY -= this.speed
                        this.imgProperties.posY -= this.speed
                        this.updateCoords()
                        this.currentAnimationIndex = 1
                        break
                  case 'DOWN':
                        this.posY += this.speed
                        this.imgProperties.posY += this.speed
                        this.updateCoords()
                        this.currentAnimationIndex = 0
                        break
                  case 'RIGHT':
                        this.posX += this.speed
                        this.imgProperties.posX += this.speed
                        this.updateCoords()
                        this.currentAnimationIndex = 2
                        break
                  case 'LEFT':
                        this.posX -= this.speed
                        this.imgProperties.posX -= this.speed
                        this.updateCoords()
                        this.currentAnimationIndex = 3
                        break
                  default:
                        this.animations[this.currentAnimationIndex].reset()
                        timer = 1
                        break
            }
            this.animations[this.currentAnimationIndex].draw(timer, this.imgProperties.posX, this.imgProperties.posY)

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

      //Dibuja al jugador en el sprite correcto
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

      }

      putBomb() {
            if (this.bombs.length < this.maxBombs) {
                  this.bombs.push(new Bomb(this.ctx, this.tileCoord.col, this.tileCoord.row, this.tileSize))
            }
      }

      updateBombs(deltaTime) {
            this.bombs.forEach(elm => elm.update(deltaTime))
            this.bombs = this.bombs.filter(elm => !elm.isExploded)
      }

}