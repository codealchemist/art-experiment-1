import { colors } from 'config'

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomColor() {
  const totalColors = colors.length
  const colorIndex = getRandomInt(0, totalColors - 1)
  return colors[colorIndex]
}

export function getCirclePosition(diameter, points, index) {
  const angleFactor = (points * 100 / 360) * index
  const radius = diameter / 2
  return {
    x: Math.cos(angleFactor * 360) * radius,
    y: Math.sin(angleFactor * 360) * radius
  }
}

export function onKey(key, callback) {
  window.addEventListener('keydown', (event) => {
    if (event.key === key || event.code === key) callback()
  })
}
