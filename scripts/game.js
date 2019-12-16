class Game {
  constructor() {
    this.canvas = document.getElementById('game')
    this.context = this.canvas.getContext('2d')
    this.screenManager = new ScreenManager()
    this.timePerFrame = 1000 / 60
    this.lastFrameTime = null
  }

  // Utilizamos la forma de arrow function para que al ser llamado por `window.requestAnimationFrame`
  // no cambie el significado de `this`.
  loop = timestamp => {
    if (this.lastFrameTime == null) {
      this.lastFrameTime = timestamp
    }
    let currentFrameTime = timestamp - this.lastFrameTime
    while (currentFrameTime >= this.timePerFrame) {
      this.update(this.timePerFrame)
      currentFrameTime -= this.timePerFrame
      this.lastFrameTime += this.timePerFrame
    }
    this.render()
  }

  render() {
    this.screenManager.render(this.context)

    // Cada que el browser dibuja un "frame" (ej. a 60 fps), llama a `this.loop`.
    window.requestAnimationFrame(this.loop)
  }

  start() {
    this.loop(0)
  }

  update(deltaTime) {
    this.screenManager.update(deltaTime)
  }
}
