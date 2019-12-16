class ScreenHowToPlay extends Screen {
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
        sprites: [new Sprite(this.assetManager, 'instructions', { width: 480, height: 360 })]
      }),
      transition: new Transition({
        start: null,
        end: { x: 240, y: 300, zoom: 1 },
        length: 0,
        rewind: false,
        loop: false
      })
    })

    this.addChild({
      animation: new Animation({
        sprites: [new Sprite(this.assetManager, 'cacti-character', { width: 512, height: 512 })]
      }),
      transition: new Transition({
        start: null,
        end: { x: 530, y: 192, zoom: 0.5 },
        length: 0,
        rewind: false,
        loop: false
      })
    })

    this.addChild({
      animation: new Animation({
        sprites: [new Sprite(this.assetManager, 'how-to-play', { width: 438, height: 175 })]
      }),
      transition: new Transition({
        start: null,
        end: { x: 320, y: 60, zoom: 0.75 },
        length: 0,
        rewind: false,
        loop: false
      })
    })

    this.timeout = setTimeout(() => this.screenManager.changeScreen('gameplay'), 10000)
    window.addEventListener('keyup', this.onKeyUp)
  }

  cleanup() {
    super.cleanup()
    window.removeEventListener('keyup', this.onKeyUp)
  }

  onKeyUp = ({ key }) => {
    if (key === 'Enter') {
      clearTimeout(this.timeout)
      this.screenManager.changeScreen('gameplay')
    }
  }

  render(ctx) {
    super.render(ctx)
  }

  update(delta) {
    super.update(delta)
  }
}

screens['how-to-play'] = ScreenHowToPlay
