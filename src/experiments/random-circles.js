import { colors, width, height } from 'config'
import { getRandomInt, getRandomColor } from 'util'

function randomCircles () {
  const stage = new createjs.Stage('canvas');
  const minCircleDiameter = 5
  const maxCircleDiameter = 50

  function getRandomCircle() {
    const diameter = getRandomInt(minCircleDiameter, maxCircleDiameter)
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

  for (let i = 0; i < 100; i++) {
    const circle = getRandomCircle()
    stage.addChild(circle)
  }

  //Update stage will render next frame
  stage.update()
}

export default randomCircles
