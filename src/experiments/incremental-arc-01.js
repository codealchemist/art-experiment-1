import { colors, getWidth, getHeight } from 'config'
import { getRandomColor } from 'util'

function incrementalArc01 (stage, total = 40) {
  const width = getWidth()
  const height = getHeight()
  const coordinates = []
  const lengthMulti = width / 10
  let xDirection = 1
  let yDirection = 1

  function getNext (index) {
    const prevCoordinates = coordinates[index - 2] || {
      x: width / 2,
      y: height / 2,
      x1: width / 2 + lengthMulti * xDirection,
      y1: height / 2 + lengthMulti * yDirection
    }
    const color = getRandomColor(colors)
    const shape = new createjs.Shape()
    if (index % 4) {
      xDirection = -xDirection
    }

    if (index % 3) {
      yDirection = -yDirection
    }

    if (index % 2) {
      xDirection = -xDirection
      yDirection = -yDirection
    }

    // Position.
    let yMulti = 1.5
    if (yDirection < 0) yMulti = 1 / yMulti
    const x = width / 2
    const y = height / 2
    let x1 = prevCoordinates.x1 + lengthMulti * 2 * xDirection
    let y1 = prevCoordinates.y1 + lengthMulti * yDirection
    let x2 = prevCoordinates.x1 + lengthMulti * xDirection
    let y2 = prevCoordinates.y1 + lengthMulti * 2 * yDirection

    shape.graphics
      .setStrokeStyle(1)
      .beginStroke(color)
      .moveTo(x, y)
      .bezierCurveTo(x1, y1, x2, y2, x, y)
    coordinates.push({ x, y, x1, y1, x2, y2 })

    // Effects.
    shape.alpha = 0.75

    return shape
  }

  for (let i = 1; i <= total; i++) {
    const line = getNext(i)
    stage.addChild(line)
  }
  console.log(coordinates)

  // Update stage will render next frame.
  stage.update()

  return stage
}

export default incrementalArc01
