class Game {
      constructor(ctx) {
            this.ctx = ctx

            this.tileSize = 65

            //Escenario
            this.scenary = new Scenary(this.ctx, this.tileSize)
            //Jugador
            this.player = new Player(this.ctx, this.tileSize, 1, 1)
            //lastKeyPressed se usa para poner bombas mientras se mueve el jugador. No le frena
            this.lastKeyPressed = undefined

            this.setListeners()
      }

      update(deltaTime) {
            this.scenary.update()
            this.player.update(deltaTime)
            this.checkPlayerCollisions()
            this.checkExplosions()
      }

      //Movimiento del jugador
      setListeners() {
            document.addEventListener("keydown", e => {

                  switch (e.keyCode) {
                        //ARRIBA
                        case 38:
                              if (this.player.direction != 'BLOCKED-UP') {
                                    this.lastKeyPressed = 38
                                    this.player.changeDirection('UP')
                              }
                              break
                        //ABAJO
                        case 40:
                              if (this.player.direction != 'BLOCKED-DOWN') {
                                    this.lastKeyPressed = 40
                                    this.player.changeDirection('DOWN')
                              }
                              break
                        //IZQUIERDA
                        case 37:
                              if (this.player.direction != 'BLOCKED-LEFT') {
                                    this.lastKeyPressed = 37
                                    this.player.changeDirection('LEFT')
                              }
                              break
                        //DERECHA
                        case 39:
                              if (this.player.direction != 'BLOCKED-RIGHT') {
                                    this.lastKeyPressed = 39
                                    this.player.changeDirection('RIGHT')
                              }
                              break
                        //ESPACIO
                        case 32:
                              this.player.putBomb()
                              break
                  }
            });

            document.addEventListener("keyup", e => {
                  if (this.lastKeyPressed === e.keyCode) {
                        this.lastKeyPressed = undefined
                        this.player.direction.indexOf('BLOCKED') === -1 ? this.player.changeDirection('') : null
                  }
            })
      }

      //Colision del jugador con el escenario
      checkPlayerCollisions() {
            //Se comprueba la colision solo con las celdas alrededor del jugador
            for (let i = this.player.tileCoord.row - 1; i <= this.player.tileCoord.row + 1; i++) {
                  for (let j = this.player.tileCoord.col - 1; j <= this.player.tileCoord.col + 1; j++) {
                        //Condiciónes de colisión
                        if (this.scenary.scenaryTiles[i][j].isBlocking) {
                              if (this.scenary.scenaryTiles[i][j].posX < this.player.posX + this.player.width &&
                                    this.scenary.scenaryTiles[i][j].posX + this.scenary.scenaryTiles[i][j].size > this.player.posX &&
                                    this.scenary.scenaryTiles[i][j].posY < this.player.posY + this.player.height &&
                                    this.scenary.scenaryTiles[i][j].posY + this.scenary.scenaryTiles[i][j].size > this.player.posY) {
                                    //Gestión del movimiento y posicion del jugador en caso de colisión
                                    switch (this.player.direction) {
                                          case 'UP':
                                                this.player.direction = 'BLOCKED-UP'
                                                this.player.translate(this.player.posX, this.scenary.scenaryTiles[i][j].posY + this.scenary.scenaryTiles[i][j].size)
                                                break
                                          case 'DOWN':
                                                this.player.direction = 'BLOCKED-DOWN'
                                                this.player.translate(this.player.posX, this.scenary.scenaryTiles[i][j].posY - this.player.height)
                                                break
                                          case 'LEFT':
                                                this.player.direction = 'BLOCKED-LEFT'
                                                this.player.translate(this.scenary.scenaryTiles[i][j].posX + this.scenary.scenaryTiles[i][j].size, this.player.posY)
                                                break
                                          case 'RIGHT':
                                                this.player.direction = 'BLOCKED-RIGHT'
                                                this.player.translate(this.scenary.scenaryTiles[i][j].posX - this.player.width, this.player.posY)
                                                break
                                    }
                              }
                        }
                  }
            }
      }

      checkExplosions() {
            this.player.bombs.forEach(elm => {
                  if (elm.isExploded) {
                        if (elm.coord.x + 1 < this.scenary.scenaryMap[elm.coord.y].length) {
                              this.scenary.scenaryMap[elm.coord.y][elm.coord.x + 1] === 'B' ? this.scenary.scenaryTiles[elm.coord.y][elm.coord.x + 1].isBreaking = true : null
                        }
                        if (elm.coord.x - 1 >= 0) {
                              this.scenary.scenaryMap[elm.coord.y][elm.coord.x - 1] === 'B' ? this.scenary.scenaryTiles[elm.coord.y][elm.coord.x - 1].isBreaking = true : null
                        }
                        if (elm.coord.y + 1 < this.scenary.scenaryMap.length) {
                              this.scenary.scenaryMap[elm.coord.y + 1][elm.coord.x] === 'B' ? this.scenary.scenaryTiles[elm.coord.y + 1][elm.coord.x].isBreaking = true : null
                        }
                        if (elm.coord.y - 1 >= 0) {
                              this.scenary.scenaryMap[elm.coord.y - 1][elm.coord.x] === 'B' ? this.scenary.scenaryTiles[elm.coord.y - 1][elm.coord.x].isBreaking = true : null
                        }
                        elm.isDone = true
                  }
            })
      }

}