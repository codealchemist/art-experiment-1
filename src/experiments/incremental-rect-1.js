import { colors, width, height } from 'config'
import { getRandomColor, getCirclePosition } from 'util'

function incrementalLines1(total=100) {
  const stage = new createjs.Stage('canvas');

  function getNext(index) {
    const color = getRandomColor(colors)
    const shape = new createjs.Shape();

    // Position.
    const pos = getCirclePosition(width/2, total, index)
    const lineWidth = pos.x
    const lineHeight = pos.y
    const xCenter = width/2
    const yCenter = height/2
    shape.graphics.beginFill(color).drawRect(xCenter, yCenter, lineWidth, lineHeight)

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
