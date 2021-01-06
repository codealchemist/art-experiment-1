import { colors, width, height } from 'config'
import { getRandomColor, getRandomInt } from 'util'

function incrementalCircles2 () {
  const stage = new createjs.Stage('canvas');

  function getNextCircle(index) {
    const diameter = 200 - 2 * index
    const color = getRandomColor(colors)
    const circle = new createjs.Shape();
    circle.graphics.beginFill(color).drawCircle(0, 0, diameter);

    // Position.
    const x = width / 2
    const y = height / 2
    circle.x = x
    circle.y = y

    // Effects.
    const opacity = index / 100
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
