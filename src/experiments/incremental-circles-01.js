import { colors, getWidth, getHeight } from 'config'
import { getRandomColor, getRandomInt } from 'util'

function incrementalCircles (stage) {
  const width = getWidth()
  const height = getHeight()

  function getNextCircle(index) {
    const diameter = 2 * index
    const color = getRandomColor(colors)
    const circle = new createjs.Shape();
    circle.graphics.beginFill(color).drawCircle(0, 0, diameter);

    // Position.
    const x = getRandomInt(0, width)
    const y = getRandomInt(0, height)
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

export default incrementalCircles
