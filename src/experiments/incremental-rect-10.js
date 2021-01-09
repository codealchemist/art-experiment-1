import { colors, getWidth, getHeight } from 'config'
import { getRandomColor } from 'util'

function incrementalLines10(stage, total=100) {
  const width = getWidth()
  const height = getHeight()
  const coordinates = []
  let lineWidth = width/50
  let lineHeight = height
  let direction = 1
  const offset = lineWidth/3

  function getNext(index) {
    const prevCoordinates = coordinates[index - 2] || { x: 0, y: 0 }
    const color = getRandomColor(colors)
    const shape = new createjs.Shape()

    // Position.
    let xMove = lineWidth * direction
    if (index === 1) xMove = 0
    let x = prevCoordinates.x + xMove
    const y = 0
    shape.graphics.beginFill(color).drawRect(x, y, lineWidth, lineHeight)

    if (x + xMove > width || x + xMove < 0) {
      direction = -direction
      
      // Offset.
      x = x + offset * direction
    }
    console.log('direction', direction)

    const pos = { x, y }
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

export default incrementalLines10
