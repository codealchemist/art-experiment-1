import { colors, getWidth, getHeight } from 'config'
import { getRandomColor, getCirclePosition } from 'util'

function incrementalCircles10(stage, total=100) {
  const width = getWidth()
  const height = getHeight()

  function getNextCircle(index) {
    const diameter = width/(2.5*Math.PI)
    const color = getRandomColor(colors)
    const circle = new createjs.Shape();
    circle.graphics.beginFill(color).drawCircle(0, 0, diameter);

    // Position.
    const pos = getCirclePosition(width/Math.PI, total, index)
    const x = width/2 + pos.x
    const y = height/2 + pos.y
    circle.x = x
    circle.y = y

    // Effects.
    circle.alpha = 0.5

    return circle
  }

  for (let i = 1; i <= total; i++) {
    const circle = getNextCircle(i)
    stage.addChild(circle)
  }

  // Update stage will render next frame.
  stage.update()

  return stage
}

export default incrementalCircles10
