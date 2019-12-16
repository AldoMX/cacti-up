class ScreenCongratulations extends Screen {
  constructor(args) {
    super(args)

    this.addChild({
      animation: new Animation({
        sprites: [new Sprite(this.assetManager, 'background', { width: 640, height: 480 })]
      }),
      transition: new Transition({
        start: null,
        end: { x: 320, y: 240, zoom: 1 },
        length: 0,
        rewind: false,
        loop: false
      })
    })

    this.addChild({
      animation: new Animation({
        sprites: [new Sprite(this.assetManager, 'congratulations', { width: 589, height: 175 })]
      }),
      transition: new Transition({
        start: { x: 320, y: 240, zoom: 0.01 },
        end: { x: 320, y: 240, zoom: 1.0 },
        length: 1000,
        rewind: false,
        loop: false
      })
    })

    setTimeout(() => this.screenManager.changeScreen('gameplay'), 4000)
  }

  cleanup() {
    super.cleanup()
  }

  render(ctx) {
    super.render(ctx)
  }

  update(delta) {
    super.update(delta)
  }
}

screens['congratulations'] = ScreenCongratulations
