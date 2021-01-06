import { colors, getWidth, getHeight } from 'config'
import { getRandomColor, getCirclePosition } from 'util'

function incrementalLines1(stage, total=15) {
  const width = getWidth()
  const height = getHeight()
  const coordinates = []

  function getNext(index) {
    const prevCoordinates = coordinates[index - 2]
    const color = getRandomColor(colors)
    const shape = new createjs.Shape()

    // Position.
    const pos = getCirclePosition(width/2, total, index)
    coordinates.push(pos)
    const x = pos.x
    const y = pos.y

    const lineWidth = prevCoordinates?.x + width || width/2
    const lineHeight = prevCoordinates?.y + height || height/2
    shape.graphics.beginFill(color).drawRect(x, y, lineWidth, lineHeight)

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

export default incrementalLines1
