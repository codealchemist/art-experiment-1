import { colors, getWidth, getHeight } from 'config'
import { getRandomColor } from 'util'

function incrementalLines11 (stage, total = 1200) {
  const width = getWidth()
  const height = getHeight()
  const coordinates = []
  let lineWidth = width / 50
  let xDirection = 1
  let yDirection = 1

  let prevRotation = 0
  function getRotation (index) {
    const percentage = (index * 100) / total
    prevRotation = (360 * percentage) / 100 + prevRotation
    return prevRotation
  }

  function getNext (index) {
    const prevCoordinates = coordinates[index - 2] || { x: 0, y: 0 }
    const color = getRandomColor(colors)
    const shape = new createjs.Shape()

    // Position.
    let yMulti = 1.15
    if (yDirection < 0) yMulti = 1 / yMulti
    const x = prevCoordinates.x
    const y = prevCoordinates.y
    let x1 = x + 50 * xDirection
    let y1 = y * yMulti + 50 * yDirection

    if (x1 > width) {
      xDirection = -xDirection
      x1 = x + 50 * xDirection
    }

    if (y1 > height) {
      yDirection = -yDirection
      y1 = y / yMulti + 50 * yDirection
    }

    if (x1 < 0) {
      xDirection = -xDirection
      x1 = x + 50 * xDirection
    }

    if (y1 < 0) {
      yDirection = -yDirection
      y1 = y * yMulti + 50 * yDirection
    }

    shape.graphics
      .setStrokeStyle(2)
      .beginStroke(color)
      .moveTo(x, y)
      .lineTo(x1, y1)
    coordinates.push({ x: x1, y: y1 })

    // Effects.
    shape.alpha = 0.5
    // shape.rotation = index

    return shape
  }

  for (let i = 1; i <= total; i++) {
    const line = getNext(i)
    stage.addChild(line)
  }

  // Update stage will render next frame.
  stage.update()

  return stage
}

export default incrementalLines11
