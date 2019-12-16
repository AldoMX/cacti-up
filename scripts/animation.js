class Animation {
  constructor({ sprites = [], length = 1 }) {
    this.delta = 0
    this.length = length
    this.sprites = sprites
  }

  render(ctx, state) {
    const activeSprite = Math.floor((this.delta % this.length) * this.sprites.length)
    this.sprites[activeSprite].render(ctx, state)
  }

  update(delta) {
    this.delta += delta
  }
}
