import { colors, getWidth, getHeight } from 'config'
import { getRandomColor } from 'util'

function incrementalLines8(stage, total=1620) {
  const width = getWidth()
  const height = getHeight()
  const coordinates = []
  const cuadrantWidth = width/2
  const cuadrantHeight = height/2
  const cuadrants = [
    { x: 0, y: 0 },
    { x: 0, y: cuadrantHeight },
    { x: cuadrantWidth, y: cuadrantHeight },
    { x: cuadrantWidth, y: 0 }
  ]
  const itemsPerCuadrant = total / cuadrants.length
  const boxDistance = 1
  let currentCuadrant = 1
  let lineWidth = width/2
  let lineHeight = height/2

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

    // Position.
    const { x, y } = cuadrant
    const pos = { x, y }
    coordinates.push(pos)
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
