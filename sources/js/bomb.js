class Bomb {
      constructor(ctx, coordX, coordY, tileSize, power = 1) {
            this.ctx = ctx

            this.power = power

            //Situación en el escenario
            this.coord = {
                  x: coordX,
                  y: coordY
            }

            //Propiedades de la imagen
            this.width = tileSize
            this.height = tileSize
            this.posx = this.coord.x * this.width
            this.posY = this.coord.y * this.height

            //IMAGENES
            this.img = new Sprite(this.ctx, 200, 'bomb/Bomb.png', 4, this.width, this.height)
            this.timer = 0

            this.explosions = []
            this.initExplosions()

            //Estados bomba: No explatada, explotando, explotada
            this.isExploding = false
            this.isExploded = false
            this.isDone = false
      }

      //Actualización de la bomba
      update(deltaTime) {
            this.updateTimer(deltaTime)
            if (!this.isExploding) {
                  this.img.draw(this.timer, this.posx, this.posY)
                  this.explote()
            } else {
                  this.drawExplosion()
                  this.timer >= 460 ? this.isExploded = true : null
            }
      }

      //Actualización del tiempo
      updateTimer(deltaTime) {
            this.timer + deltaTime >= 10000 ? this.timer = 0 : this.timer += deltaTime
      }

      //Cambia estado de la bomba
      explote() {
            if (this.timer > 2400) {
                  this.isExploding = true
                  this.timer = 0
            }
      }

      drawExplosion() {
            this.explosions.forEach(elm => { elm.img.draw(this.timer, elm.posX, elm.posY) })
      }


      initExplosions() {
            //Cuanto tarda en cambiar los frames
            const time = 120

            //EXPLOSION CENTRAL
            this.explosions.push({
                  img: new Sprite(this.ctx, time, 'bomb/explosionCentral.png', 4, this.width, this.height),
                  posX: this.coord.x * this.width,
                  posY: this.coord.y * this.height
            })

            for (let row = this.coord.y - this.power; row <= this.coord.y + this.power; row++) {
                  for (let col = this.coord.x - this.power; col <= this.coord.x + this.power; col++) {
                        //Si está en la vertical de la bomba
                        if (col === this.coord.x) {
                              //ARRIBA DE LA BOMBA
                              if (row < this.coord.y) {
                                    switch (row) {
                                          //ES UN EXTREMO
                                          case this.coord.y - this.power:
                                                this.explosions.push({
                                                      img: new Sprite(this.ctx, time, 'bomb/explosionUp.png', 4, this.width, this.height),
                                                      posX: col * this.width,
                                                      posY: row * this.height
                                                })
                                                break
                                          default:
                                                this.explosions.push({
                                                      img: new Sprite(this.ctx, time, 'bomb/explosionVertical.png', 4, this.width, this.height),
                                                      posX: col * this.width,
                                                      posY: row * this.height
                                                })
                                                break
                                    }
                              }
                              //DEBAJO DE LA BOMBA
                              else if (row > this.coord.y) {
                                    switch (row) {
                                          //ES UN EXTREMO
                                          case this.coord.y + this.power:

                                                this.explosions.push({
                                                      img: new Sprite(this.ctx, time, 'bomb/explosionDown.png', 4, this.width, this.height),
                                                      posX: col * this.width,
                                                      posY: row * this.height
                                                })
                                                break
                                          default:
                                                this.explosions.push({
                                                      img: new Sprite(this.ctx, time, 'bomb/explosionVertical.png', 4, this.width, this.height),
                                                      posX: col * this.width,
                                                      posY: row * this.height
                                                })
                                                break
                                    }
                              }
                        }
                        //Si está en la horizontal de la bomba
                        if (row === this.coord.y) {
                              //IZQUIERDA DE LA BOMBA
                              if (col < this.coord.x) {
                                    switch (col) {
                                          //ES UN EXTREMO
                                          case this.coord.x - this.power:
                                                this.explosions.push({
                                                      img: new Sprite(this.ctx, time, 'bomb/explosionLeft.png', 4, this.width, this.height),
                                                      posX: col * this.width,
                                                      posY: row * this.height
                                                })
                                                break
                                          default:
                                                this.explosions.push({
                                                      img: new Sprite(this.ctx, time, 'bomb/explosionHorizontal.png', 4, this.width, this.height),
                                                      posX: col * this.width,
                                                      posY: row * this.height
                                                })
                                                break
                                    }
                              }
                              //DERECHA DE LA BOMBA
                              else if (col > this.coord.x) {
                                    switch (col) {
                                          //ES UN EXTREMO
                                          case this.coord.x + this.power:
                                                this.explosions.push({
                                                      img: new Sprite(this.ctx, time, 'bomb/explosionRight.png', 4, this.width, this.height),
                                                      posX: col * this.width,
                                                      posY: row * this.height
                                                })
                                                break
                                          default:
                                                this.explosions.push({
                                                      img: new Sprite(this.ctx, time, 'bomb/explosionHorizontal.png', 4, this.width, this.height),
                                                      posX: col * this.width,
                                                      posY: row * this.height
                                                })
                                                break
                                    }
                              }
                        }
                  }
            }
      }

}
