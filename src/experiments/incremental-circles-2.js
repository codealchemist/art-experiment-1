import { colors } from 'config'
import { getRandomColor, getRandomInt } from 'util'

function incrementalCircles2 (stage) {
  function getNextCircle(index) {
    const diameter = 2 * index
    const color = getRandomColor(colors)
    const circle = new createjs.Shape();
    circle.graphics.beginFill(color).drawCircle(0, 0, diameter);

    // Position.
    const x = 4 * index
    const y = 4 * index
    circle.x = x
    circle.y = y

    // Effects.
    const opacity = getRandomInt(0, 100) / 100
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
