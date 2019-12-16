class ScreenManager {
  constructor(assetManager) {
    this.assetManager = new AssetManager()
    this.activeScreen = new ScreenLogo(this.newScreenArguments)
    this.song = 0
  }

  changeScreen(screenName) {
    const previousScreen = this.activeScreen
    previousScreen.cleanup()

    switch (screenName) {
      case 'logo':
        this.song = 0
        break

      case 'congratulations':
        this.song += 1
        break

      case 'gameplay':
        if (this.song >= settings.songs.length) {
          this.changeScreen('logo')
          return
        }
    }
    this.activeScreen = new screens[screenName](this.newScreenArguments)
  }

  get newScreenArguments() {
    return { assetManager: this.assetManager, screenManager: this }
  }

  render(ctx) {
    ctx.beginPath()
    ctx.rect(0, 0, 640, 480)
    ctx.fillStyle = 'black'
    ctx.fill()
    this.activeScreen.render(ctx)
  }

  update(delta) {
    this.activeScreen.update(delta)
  }
}
