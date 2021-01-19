import { colors, getWidth, getHeight } from 'config'
import { getRandomColor } from 'util'

function incrementalLines13 (stage, total = 1200) {
  const width = getWidth()
  const height = getHeight()
  const coordinates = []
  const lengthMulti = width / 22
  let xDirection = 1
  let yDirection = 1
  let yDisplacement = 0

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
    let yMulti = 1.5
    if (yDirection < 0) yMulti = 1 / yMulti
    const x = prevCoordinates.x
    const y = prevCoordinates.y
    if (y % 3) yDirection = -yDirection
    let x1 = x + lengthMulti * xDirection
    let y1 = y * yMulti + lengthMulti * yDirection

    if (x1 > width + lengthMulti) {
      xDirection = -xDirection
      x1 = x + lengthMulti * xDirection
    }

    if (y1 > height + y) {
      yDirection = -yDirection
      y1 = y / yMulti + lengthMulti * yDirection
    }

    if (x1 < 0) {
      xDirection = -xDirection
      x1 = x + lengthMulti * xDirection
    }

    if (y1 < 0) {
      yDirection = -yDirection
      y1 = y * yMulti + lengthMulti * yDirection
    }

    shape.graphics
      .setStrokeStyle(1)
      .beginStroke(color)
      .moveTo(x, y)
      .lineTo(x1, y1)
    coordinates.push({ x: x1, y: y1 })

    // Effects.
    shape.alpha = 0.75
    shape.rotation = index / 2

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

export default incrementalLines13
