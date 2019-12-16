class Receptor {
  constructor(assetManager) {
    this.receptors = [
      {
        sprite: new Sprite(assetManager, 'cacti-receptor-01', { width: 48, height: 48 }),
        state: { x: 224, y: settings.gameplayY, zoom: 1 }
      },
      {
        sprite: new Sprite(assetManager, 'cacti-receptor-02', { width: 48, height: 48 }),
        state: { x: 272, y: settings.gameplayY, zoom: 1 }
      },
      {
        sprite: new Sprite(assetManager, 'cacti-receptor-03', { width: 48, height: 48 }),
        state: { x: 320, y: settings.gameplayY, zoom: 1 }
      },
      {
        sprite: new Sprite(assetManager, 'cacti-receptor-02', { width: 48, height: 48 }),
        state: { x: 368, y: settings.gameplayY, zoom: 1 }
      },
      {
        sprite: new Sprite(assetManager, 'cacti-receptor-01', { width: 48, height: 48 }),
        state: { x: 416, y: settings.gameplayY, zoom: 1 }
      }
    ]
  }

  cleanup() {}

  render(ctx) {
    for (const receptor of this.receptors) {
      const { sprite, state } = receptor
      sprite.render(ctx, state)
    }
  }

  update(delta) {}
}
