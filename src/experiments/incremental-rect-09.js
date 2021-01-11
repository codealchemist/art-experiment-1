import { colors, getWidth, getHeight } from 'config'
import { getRandomColor } from 'util'

function incrementalLines8(stage, total=52) {
  const width = getWidth()
  const height = getHeight()
  const coordinates = []
  const cuadrantWidth = width/2
  const cuadrantHeight = height/2
  const cuadrants = [
    { index: 1, x: 0, y: 0 },
    { index: 2, x: 0, y: cuadrantHeight },
    { index: 3, x: cuadrantWidth, y: cuadrantHeight },
    { index: 4, x: cuadrantWidth, y: 0 }
  ]
  const itemsPerCuadrant = total / cuadrants.length
  const boxDistance = width/50
  let currentCuadrant = 1
  let lineWidth = width/2
  let lineHeight = height/2
  let cuadrantPos = 0
  let currentCuadrantIndex = 0

  function getCuadrant(index, onChange) {
    if (index > itemsPerCuadrant * currentCuadrant) {
      currentCuadrant++
      onChange()
    }
    return cuadrants[currentCuadrant - 1]
  }

  function getNext(index) {
    const prevCoordinates = coordinates[index - 2]
    const color = getRandomColor(colors)
    const shape = new createjs.Shape()
    const cuadrant = getCuadrant(index, () => {
      // Reset box size on cuadrant change.
      lineWidth = width/2
      lineHeight = height/2
    })
    if (cuadrant.index === currentCuadrantIndex) {
      cuadrantPos++
    } else {
      cuadrantPos = 1
      currentCuadrantIndex = cuadrant.index
    }
    console.log('Cuadrant pos:', cuadrantPos)

    // Position.
    let { x, y } = cuadrant
    const pos = { x, y }
    coordinates.push(pos)
    // if (cuadrantPos !== 1) {
    //   // Center
    //   console.log('center', pos)
    //   x = x + boxDistance/2
    //   y = y + boxDistance/2
    // }
    if (cuadrantPos > 1) {
      // Center
      console.log('center', pos)
      x = x + (cuadrantPos-1) * boxDistance/2
      y = y + (cuadrantPos-1) * boxDistance/2
      console.log('adjusted:', {x, y})
    }
    shape.graphics.beginFill(color).drawRect(x, y, lineWidth, lineHeight)

    // Increment size.
    lineWidth = lineWidth - boxDistance
    lineHeight = lineHeight - boxDistance

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

export default incrementalLines8
