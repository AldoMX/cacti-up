class Row {
  static notes = []

  constructor(line) {
    this.columns = new Set()
    this.pressedColumns = new Set()
    this.parseLine(line)
  }

  isHit() {
    return this.columns.size === this.pressedColumns.size
  }

  parseLine(line) {
    const rawNotes = line.split('')
    rawNotes.forEach((rawNote, column) => {
      switch (rawNote) {
        case '.': // empty
        case 'H': // hold body, ignore
        case 'W': // hold tail, ignore
          break

        case 'X': // tap
        case 'M': // hold head
          this.columns.add(column)
      }
    })
  }

  render(ctx, y) {
    if (this.isHit()) {
      return
    }

    for (const column of this.columns) {
      const { sprite, state } = Row.notes[column]
      sprite.render(ctx, { ...state, y })
    }
  }
}
