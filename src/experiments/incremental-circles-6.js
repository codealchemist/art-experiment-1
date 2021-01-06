import { colors, getWidth, getHeight } from 'config'
import { getRandomColor } from 'util'

function incrementalCircles2 (stage) {
  const width = getWidth()
  const height = getHeight()

  function getNextCircle(index) {
    const diameter = 200 - 2 * index
    const color = getRandomColor(colors)
    const circle = new createjs.Shape();
    circle.graphics.beginFill(color).drawCircle(0, 0, diameter);

    // Position.
    let posDiffX = height/10
    let posDiffY = height/10
    if (index % 3 === 0) {
      posDiffX = -height/10
    }
    if (index % 4 === 0) {
      posDiffX = -height/10
      posDiffY = -height/10
    }
    if (index % 5 === 0) {
      posDiffY = -height/10
    }
    const x = width/2 - posDiffX
    const y = height/2 - posDiffY
    circle.x = x
    circle.y = y

    // Effects.
    const opacity = index/100
    circle.alpha = opacity

    return circle
  }

  for (let i = 1; i <= 100; i++) {
    const circle = getNextCircle(i)
    stage.addChild(circle)
  }

  //Update stage will render next frame
  stage.update()
}

export default incrementalCircles2
