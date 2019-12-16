class Transition {
  constructor({ start, end, length, rewind = false, loop = false }) {
    this.delta = 0
    this.start = start
    this.end = end
    this.length = length
    this.loop = loop
    this.rewind = rewind
  }

  getState() {
    if (this.delta >= this.length && this.loop === false) {
      if (this.rewind === true) {
        return this.start
      }
      return this.end
    }

    let delta
    if (this.rewind === true) {
      delta = this.delta % this.length
    } else {
      delta = this.delta % (2 * this.length)
    }

    let percent
    if (delta < this.length) {
      percent = delta / this.length
    } else {
      delta -= this.length
      percent = 1 - delta / this.length
    }

    return {
      x: (1 - percent) * this.start.x + percent * this.end.x,
      y: (1 - percent) * this.start.y + percent * this.end.y,
      zoom: (1 - percent) * this.start.zoom + percent * this.end.zoom
    }
  }

  update(delta) {
    this.delta += delta
  }
}
