const app = {
      name: 'Masters of boomb!',
      author: 'Héctor Antón',
      version: '1.0',
      description: 'Juego tipo bomberman, donde el jugador derratara enemigos y se abrirá paso a base de bombazos',
      license: undefined,
      canvasDom: undefined,
      ctx: undefined,
      canvasSize: {
            width: undefined,
            height: undefined
      },
      deltaTime: 20,
      game: undefined,

      init(canvasId) {
            //Se prepara el Canvas
            this.canvasDom = document.getElementById(canvasId)
            this.ctx = this.canvasDom.getContext('2d')
            this.setDimensions()

            //Crea el nivel de juego
            this.game = new Game(this.ctx)

            //Intervalo Update
            this.intervalId = setInterval(() => {
                  this.update()
            }, this.deltaTime)
      },

      update() {
            //Se limpia la pantalla
            this.clearScreen()
            this.game.update(this.deltaTime)
      },

      setDimensions() {
            //Propiedades de Game
            this.canvasSize.width = window.innerWidth - 10
            this.canvasSize.height = window.innerHeight - 10
            //Atributos nodo canvas
            this.canvasDom.width = this.canvasSize.width
            this.canvasDom.height = this.canvasSize.height
      },
      clearScreen() {
            this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
      }


}