const keyToCol = {
  z: 0,
  q: 1,
  s: 2,
  e: 3,
  c: 4
}

class ScreenGameplay extends Screen {
  constructor(args) {
    super(args)
    this.step = new Step(this.screenManager)
    this.receptor = new Receptor(this.assetManager)
    this.lifebar = new Lifebar(this.step)

    this.addChild({
      animation: new Animation({
        sprites: [new Sprite(this.assetManager, 'background-gameplay', { width: 640, height: 480 })]
      }),
      transition: new Transition({
        start: null,
        end: { x: 320, y: 240, zoom: 1 },
        length: 0,
        rewind: false,
        loop: false
      })
    })

    Row.notes = [
      {
        sprite: new Sprite(this.assetManager, 'cacti-01', { width: 48, height: 48 }),
        state: { x: 224, y: 0, zoom: 1 }
      },
      {
        sprite: new Sprite(this.assetManager, 'cacti-02', { width: 48, height: 48 }),
        state: { x: 272, y: 0, zoom: 1 }
      },
      {
        sprite: new Sprite(this.assetManager, 'cacti-03', { width: 48, height: 48 }),
        state: { x: 320, y: 0, zoom: 1 }
      },
      {
        sprite: new Sprite(this.assetManager, 'cacti-02', { width: 48, height: 48 }),
        state: { x: 368, y: 0, zoom: 1 }
      },
      {
        sprite: new Sprite(this.assetManager, 'cacti-01', { width: 48, height: 48 }),
        state: { x: 416, y: 0, zoom: 1 }
      }
    ]

    const song = settings.songs[this.screenManager.song]
    this.step.loadFromUcs(song)
    window.addEventListener('keydown', this.onKeyDown)
  }

  cleanup() {
    super.cleanup()
    this.step.cleanup()
    window.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = ({ key }) => {
    if (typeof keyToCol[key] === 'undefined') {
      return
    }
    const col = keyToCol[key]
    this.step.pressColumn(col)
  }

  render(ctx) {
    super.render(ctx)
    this.receptor.render(ctx)
    this.lifebar.render(ctx)
    this.step.render(ctx)
  }

  update(delta) {
    super.update(delta)
  }
}

screens['gameplay'] = ScreenGameplay
