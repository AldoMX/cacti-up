class AssetManager {
  constructor() {
    this.assets = new Map()
  }

  loadImage(imageName) {
    const path = `./assets/images/${imageName}.png`
    if (this.assets.has(path) == false) {
      const data = new Image()
      const asset = { type: 'image', loaded: false, data }
      data.src = path
      data.onload = () => {
        asset.loaded = true
      }
      this.assets.set(path, asset)
    }
    return this.assets.get(path)
  }
}
