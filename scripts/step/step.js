class Step {
  constructor(screenManager) {
    this.audioPlayer = document.getElementById('audio')
    this.audioPlayer.addEventListener('ended', this.onEnded)
    this.screenManager = screenManager
    this.isLoading = true
    this.reset()
  }

  cleanup() {
    this.audioPlayer.removeEventListener('ended', this.onEnded)
  }

  async loadFromUcs({ id, mode }) {
    this.isLoading = true
    this.reset()

    const response = await fetch(`./assets/steps/${id}/${mode}.ucs`)
    const ucsLines = (await response.text()).split('\n')
    let currentSplit = null
    let isReadingNewSplit = false
    ucsLines.forEach(line => {
      if (line.startsWith(':')) {
        if (!isReadingNewSplit) {
          currentSplit = new Split()
          this.splits.push(currentSplit)
          isReadingNewSplit = true
        }
        const [key, value] = line.toLowerCase().split('=')
        switch (key) {
          case ':bpm':
            currentSplit.bpm = parseFloat(value)
            break

          case ':delay':
            currentSplit.delay = parseFloat(value)
            break

          case ':split':
            currentSplit.beatSplit = parseInt(value, 10)
            break
        }
        return
      }
      isReadingNewSplit = false
      const rowLine = line.trim()
      const isEmpty = Array.prototype.every.call(rowLine, c => c === '.')
      if (!isEmpty) {
        const rowIndex = currentSplit.numRows
        currentSplit.addRow(rowIndex, rowLine)
      }
      currentSplit.numRows++
    })
    this.isLoading = false
    let startTime = 0
    let startY = 0
    this.splits.forEach(split => {
      split.startTime = startTime + split.delay
      split.startY = startY
      startTime += split.time
      startY += split.beats * settings.beatHeight
      this.totalRows += split.rows.size
    })

    this.audioPlayer.src = `./assets/music/${id}.mp3`
    this.audioPlayer.currentTime = 0
    this.audioPlayer.play()
  }

  onEnded = () => {
    const percent = (this.pressedRows * 100) / this.totalRows
    if (percent >= settings.passPercent) {
      this.screenManager.changeScreen('congratulations')
    } else {
      this.screenManager.changeScreen('game-over')
    }
    console.log(`Results: ${this.pressedRows} / ${this.totalRows} (${percent.toFixed(2)}%)`)
  }

  pressColumn(col) {
    const startSearch = this.musicTime - settings.timingWindow / 2
    const endSearch = this.musicTime + settings.timingWindow / 2

    let rows = []
    for (const split of this.splits) {
      const { beatSplit, bpm, startTime } = split
      const endTime = startTime + split.time
      if (endTime < startSearch || startTime > endSearch) {
        continue
      }
      for (const [rowIndex, row] of split.rows) {
        const rowBeat = rowIndex / beatSplit
        const rowTime = startTime + (rowBeat * 60000) / bpm
        if (rowTime >= startSearch && rowTime <= endSearch) {
          rows.push(row)
        }
      }
    }

    rows = rows.filter(row => row.columns.has(col) && !row.pressedColumns.has(col))
    if (rows.length === 0) {
      return
    }

    const row = rows[0]
    row.pressedColumns.add(col)
    if (row.isHit()) {
      this.pressedRows += 1
    }
  }

  render(ctx) {
    if (this.isLoading) {
      return
    }

    this.musicTime = this.audioPlayer.currentTime * 1000
    let currentSplitIndex = this.splits.length - 1
    while (currentSplitIndex > 0) {
      const split = this.splits[currentSplitIndex]
      if (split.startTime < this.musicTime) {
        break
      }
      currentSplitIndex--
    }

    const currentSplit = this.splits[currentSplitIndex]
    const beatDiff = (this.musicTime - currentSplit.startTime) * (currentSplit.bpm / 60000)
    const yOffset = settings.gameplayY - (currentSplit.startY + beatDiff * settings.beatHeight)
    this.splits.forEach(split => split.render(ctx, yOffset))
  }

  reset() {
    this.musicTime = 0
    this.pressedRows = 0
    this.splits = []
    this.totalRows = 0
  }

  update(delta) {
    this.splits.forEach(split => split.update(delta))
  }
}
