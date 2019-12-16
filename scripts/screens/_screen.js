class Screen {
  constructor({ assetManager, screenManager }) {
    this.assetManager = assetManager
    this.screenManager = screenManager
    this.children = []
  }

  addChild({ animation, transition }) {
    this.children.push({ animation, transition })
  }

  cleanup() {}

  render(ctx) {
    this.children.forEach(({ animation, transition }) => {
      animation.render(ctx, transition.getState())
    })
  }

  update(delta) {
    this.children.forEach(({ animation, transition }) => {
      animation.update(delta)
      transition.update(delta)
    })
  }
}
