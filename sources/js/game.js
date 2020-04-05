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

      update() {
            this.scenary.update()
            this.player.update()
      }

      //Movimiento del jugador
      setListeners() {
            document.addEventListener("keydown", e => {
                  switch (e.keyCode) {
                        //ARRIBA
                        case 38:
                              this.lastKeyPressed = 38
                              this.player.changeDirection('UP')
                              break
                        //ABAJO
                        case 40:
                              this.lastKeyPressed = 40
                              this.player.changeDirection('DOWN')
                              break
                        //IZQUIERDA
                        case 37:
                              this.lastKeyPressed = 37
                              this.player.changeDirection('LEFT')
                              break
                        //DERECHA
                        case 39:
                              this.lastKeyPressed = 39
                              this.player.changeDirection('RIGHT')
                              break
                        //ESPACIO
                        case 32:
                              this.player.tileCoord.row = Math.round(this.player.posY / this.tileSize)
                              this.player.tileCoord.col = Math.round(this.player.posX / this.tileSize)
                              console.log(this.player.tileCoord.col);
                              break
                  }
            });
            document.addEventListener("keyup", e => {
                  if (this.lastKeyPressed === e.keyCode) {

                        this.lastKeyPressed = undefined
                        this.player.changeDirection('')
                  }
            })
      }

      checkCollisions() {

      }

}