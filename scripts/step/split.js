class Split {
  constructor({ delay = 0, bpm = 120, beatSplit = 2 } = {}) {
    this.delay = delay
    this.bpm = bpm
    this.beatSplit = beatSplit
    this.rows = new Map()
    this.numRows = 0
    this.startTime = 0
    this.startY = 0
  }

  addRow(index, rowLine) {
    const row = new Row(rowLine)
    if (row.columns.size > 0) {
      this.rows.set(index, row)
    }
  }

  get beats() {
    return this.numRows / this.beatSplit
  }

  get time() {
    return this.delay + (this.beats * 60000) / this.bpm
  }

  render(ctx, yOffset) {
    for (const [rowIndex, row] of this.rows) {
      const beat = rowIndex / this.beatSplit
      const rowY = this.startY + beat * settings.beatHeight + yOffset
      row.render(ctx, rowY)
    }
  }
}
