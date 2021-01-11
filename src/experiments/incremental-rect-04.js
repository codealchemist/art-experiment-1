import { colors, getWidth, getHeight } from 'config'
import { getRandomColor } from 'util'

function incrementalLines1(stage, total=10) {
  const width = getWidth()
  const height = getHeight()
  const coordinates = []

  function getNext(index) {
    const prevCoordinates = coordinates[index - 2]
    const color = getRandomColor(colors)
    const shape = new createjs.Shape()

    // Position.
    const pos = {
      x: prevCoordinates?.x + width/10 || 0,
      y: prevCoordinates?.y + height/10 || 0
    }
    coordinates.push(pos)
    const x = pos.x
    const y = pos.y

    const lineWidth = prevCoordinates?.x + width || width + width/5
    const lineHeight = prevCoordinates?.y + height || height + height/5
    shape.graphics.beginFill(color).drawRect(x, y, lineWidth, lineHeight)

    // Effects.
    shape.alpha = 0.5
    shape.rotation = index + 10

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
