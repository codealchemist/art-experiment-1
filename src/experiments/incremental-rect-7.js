import { colors, getWidth, getHeight } from 'config'
import { getRandomColor } from 'util'

function incrementalLines1(stage, total=440) {
  const width = getWidth()
  const height = getHeight()
  const coordinates = []
  let xDirection = 1
  let yDirection = 1
  let orientation = 1
  let lineWidth = width/12
  let lineHeight = 10

  function getNext(index) {
    const prevCoordinates = coordinates[index - 2]
    const color = getRandomColor(colors)
    const shape = new createjs.Shape()

    // Position.
    let x = prevCoordinates?.x + lineWidth * xDirection || 0
    let y = prevCoordinates?.y + lineHeight * yDirection || 0
    if (orientation < 0) {
      x = y
      y = prevCoordinates?.x + lineWidth * xDirection || 0
      lineWidth = lineHeight
      lineHeight = width/12
    }
    if (x > width || x < 0) xDirection = -xDirection
    if (y > height || y < 0) yDirection = -yDirection
    const pos = { x, y }
    coordinates.push(pos)
    shape.graphics.beginFill(color).drawRect(x, y, lineWidth, lineHeight)
    orientation = -orientation

    // Effects.
    shape.alpha = 0.5
    shape.rotation = index

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
