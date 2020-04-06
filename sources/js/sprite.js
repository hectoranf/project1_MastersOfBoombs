class Sprite {
      constructor(ctx, animTime, imgName, framesPerAnimation, width, height, numberOfAnimations = 1, indexAnimation = 0) {
            this.ctx = ctx

            this.animTime = animTime
            this.numberOfFrames = framesPerAnimation
            this.currentFrame = 0

            this.width = width
            this.height = height


            this.frame = {
                  width: undefined,
                  height: undefined,
                  posX: undefined,
                  posY: undefined
            }

            this.img = new Image()
            this.img.src = (`./images/${imgName}`)
            this.img.onload = () => this.setFrameProperties(numberOfAnimations, indexAnimation)
            //Posiciones y medidas dentro de la imagen


      }

      setFrameProperties(numberOfAnimations, indexAnimation) {
            this.frame.width = this.img.width / this.numberOfFrames
            this.frame.height = this.img.height / numberOfAnimations
            this.posX = 0
            this.frame.posY = this.frame.height * indexAnimation
      }

      reset() {
            this.currentFrame = 0
      }

      draw(timer, posX, posY) {
            this.updateSprite(timer)
            this.ctx.drawImage(this.img,
                  this.frame.width * this.currentFrame,
                  this.frame.posY,
                  this.frame.width,
                  this.frame.height,
                  posX,
                  posY,
                  this.width,
                  this.height
            )
      }
      updateSprite(timer) {
            timer % this.animTime === 0 ? this.currentFrame++ : null
            this.currentFrame === this.numberOfFrames ? this.currentFrame = 0 : null
      }

}