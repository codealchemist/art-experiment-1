import { colors, getWidth, getHeight } from 'config'
import { getRandomColor, getCirclePosition } from 'util'

function incrementalLines9 (stage, total = 1440) {
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

  function getTargetX (index) {
    for (let i = 1; i <= groups; i++) {
      if (index <= groupSize * i) {
        return xMap[i]
      }
    }
  }

  function getTargetY (index) {
    for (let i = 1; i <= groups; i++) {
      if (index <= groupSize * i) {
        return yMap[i]
      }
    }
  }

  function getRotation (index) {
    const percentage = (index * 100) / total
    return (360 * percentage) / 100
  }

  function getNext (index) {
    const prevCoordinates = coordinates[index - 2] || { x: 0, y: 0 }
    const color = getRandomColor(colors)
    const shape = new createjs.Shape()

    // Position.
    const diameter = width > height ? height : width
    const margin = diameter / 10
    const pos = getCirclePosition(diameter - margin, total, index)
    const x = pos.x + width / 2
    const y = pos.y + height / 2
    const x1 = getTargetX(index)
    const y1 = getTargetY(index)
    shape.graphics
      .setStrokeStyle(3)
      .beginStroke(color)
      .moveTo(x, y)
      .lineTo(x1, y1)
    coordinates.push(pos)

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

export default incrementalLines9
