import { colors, getWidth, getHeight } from 'config'
import { getRandomColor } from 'util'

function incrementalLines10 (stage, total = 240) {
  const width = getWidth()
  const height = getHeight()
  const coordinates = []
  let lineWidth = width / 50
  const groups = 4
  const groupSize = total / groups
  const xMap = {
    1: 0,
    2: width,
    3: width,
    4: 0
  }
  const yMap = {
    1: 0,
    2: 0,
    3: height,
    4: height
  }

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
    const x = prevCoordinates.x + index
    const y = prevCoordinates.y + index
    const x1 = x + width
    const y1 = y + height
    shape.graphics
      .setStrokeStyle(3)
      .beginStroke(color)
      .moveTo(x, y)
      .lineTo(x1, y1)
    coordinates.push({ x, y })

    // Effects.
    shape.alpha = 0.5
    shape.rotation = getRotation(index)

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

export default incrementalLines10
