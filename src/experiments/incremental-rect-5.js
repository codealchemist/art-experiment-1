import { colors, width, height } from 'config'
import { getRandomColor, getCirclePosition } from 'util'

function incrementalLines1(total=1024) {
  const stage = new createjs.Stage('canvas')
  const coordinates = []
  let xDirection = 1
  let yDirection = 1

  function getNext(index) {
    const prevCoordinates = coordinates[index - 2]
    const lineWidth = width/12
    const lineHeight = 10
    const color = getRandomColor(colors)
    const shape = new createjs.Shape()

    // Position.
    const x = prevCoordinates?.x + lineWidth * xDirection || 0
    const y = prevCoordinates?.y + lineHeight * yDirection || 0
    if (x > width || x < 0) xDirection = -xDirection
    if (y > height || y < 0) yDirection = -yDirection
    const pos = { x, y }
    coordinates.push(pos)
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
