class Enemy {
      constructor(ctx, coordX, coordY, size, enemyType) {
            this.ctx = ctx

            this.coord = {
                  x: coordX,
                  y: coordY
            }
            this.width = size
            this.height = size
            this.posX = this.width * this.coord.x
            this.posY = this.height * this.coord.y

            this.type = enemyType

            this.sprites = [new Sprite(this.ctx, 100, `enemy/${this.type}/alive.png`, 4, this.width, this.height),
            new Sprite(this.ctx, 160, `enemy/${this.type}/defeated.png`, 7, this.width, this.height)]
            this.currentSprite = 0

            this.timer = 0

            //Logic
            this.direction = 'RIGHT'
            this.destinyPos = {
                  x: this.posX,
                  y: this.posY
            }
            this.isDestinyReached = true

            this.speed = 3
      }
      update(deltaTime) {
            this.draw()
            this.move()
            this.timer >= 1000 ? this.timer = 0 : this.timer += deltaTime
      }

      draw() {
            this.sprites[this.currentSprite].draw(this.timer, this.posX, this.posY)
      }

      move() {
            if (!this.isDestinyReached) {
                  switch (this.direction) {
                        case 'UP':
                              this.posY -= this.speed
                              if (this.comparePosition(this.posY, this.destinyPos.y, false)) {
                                    this.isDestinyReached = true
                                    this.posY = this.destinyPos.y
                              }
                              break
                        case 'DOWN':
                              this.posY += this.speed
                              if (this.comparePosition(this.posY, this.destinyPos.y, true)) {
                                    this.isDestinyReached = true
                                    this.posY = this.destinyPos.y
                              }
                              break
                        case 'RIGHT':
                              this.posX += this.speed
                              if (this.comparePosition(this.posX, this.destinyPos.x, true)) {
                                    this.isDestinyReached = true
                                    this.posX = this.destinyPos.x
                              }
                              break
                        case 'LEFT':
                              this.posX -= this.speed
                              if (this.comparePosition(this.posX, this.destinyPos.x, false)) {
                                    this.isDestinyReached = true
                                    this.posX = this.destinyPos.x
                              }
                              break
                  }
            }
      }

      //Compara la posicion del enemigo con la de destino
      comparePosition(selfPos, destinyPos, isPositiveOrientation) {
            // isPositiveOrientation ? (selfPos >= destinyPos ? return true : return false) : (selfPos <= destinyPos ? return true : return false)
            if (isPositiveOrientation) {
                  if (selfPos >= destinyPos) return true
            } else {
                  if (selfPos <= destinyPos) return true
            }
            return false
      }


      setNewDestiny(posX, posY) {
            this.destinyPos.x = posX
            this.destinyPos.y = posY
      }

}