class Lifebar {
  constructor(step) {
    this.step = step
  }

  render(ctx) {
    // Borde
    ctx.fillStyle = '#311226'
    ctx.fillRect(200, 12, 240, 24)

    // Fondo
    ctx.fillStyle = '#6A2D3E'
    ctx.fillRect(202, 14, 236, 20)

    // Barra
    const { pressedRows, totalRows } = this.step
    const width = 236 * (pressedRows / totalRows)
    ctx.fillStyle = '#F0B958'
    ctx.fillRect(202, 14, width, 20)
  }
}
