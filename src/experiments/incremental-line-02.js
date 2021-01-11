import { colors, getWidth, getHeight } from 'config'
import { getRandomColor, getCirclePosition } from 'util'

function incrementalLines2 (stage, total = 100) {
  const width = getWidth()
  const height = getHeight()
  const coordinates = []
  let lineWidth = width / 50

  function getNext (index) {
    const prevCoordinates = coordinates[index - 2] || { x: 0, y: 0 }
    const color = getRandomColor(colors)
    const shape = new createjs.Shape()

    // Position.
    const pos = getCirclePosition(width / 2 - lineWidth * 3, total, index)
    console.log('POS', pos)
    const x = pos.x + width / 2
    const y = pos.y + height / 2 - lineWidth / 2
    const x1 = x + lineWidth
    const y1 = y + lineWidth
    shape.graphics
      .setStrokeStyle(3)
      .beginStroke(color)
      .moveTo(x, y)
      .lineTo(x1, y1)
    coordinates.push(pos)

    // Effects.
    shape.alpha = 0.5

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

export default incrementalLines2
