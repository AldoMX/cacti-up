class Sprite {
  constructor(assetManager, image, { width, height }) {
    this.asset = assetManager.loadImage(image)
    this.width = width
    this.height = height
  }

  render(ctx, state) {
    const { x = 0, y = 0, zoom = 1 } = state
    const zoomedWidth = this.width * zoom
    const zoomedHeight = this.height * zoom
    const topLeftX = x - zoomedWidth / 2
    const topLeftY = y - zoomedHeight / 2
    ctx.drawImage(this.asset.data, topLeftX, topLeftY, zoomedWidth, zoomedHeight)
  }
}
