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

export function debounce(callback, ms=500) {
  let debounced = false
  return function debouncedCallback() {
    if (debounced) return
    debounced = true
    callback(...arguments)
    setTimeout(() => debounced = false, ms)
  }
}

export function onResize(callback, debounceMs) {
  const debouncedCallback = debounce(callback, debounceMs)
  window.addEventListener('resize', debouncedCallback)
}

export function setCanvasSize($canvas, width = window.innerWidth, height = window.innerHeight) {
  $canvas.width = width
  $canvas.height = height
}

class Fullscreen {
  isFullscreen() {
    this.fullscreenElement = document.fullscreenElement
    if (this.fullscreenElement === undefined)
      this.fullscreenElement = document.webkitFullscreenElement
    return !!this.fullscreenElement
  }

  toggle() {
    if (this.isFullscreen()) return this.disableFullscreen()
    this.enableFullscreen()
  }

  enableFullscreen() {
    if (document.body.requestFullscreen)
      return document.body.requestFullscreen()
    document.body.webkitRequestFullScreen()
  }

  disableFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen()
    document.webkitExitFullscreen()
  }

  set(el = document) {
    if (typeof el === 'string') el = document.querySelector(el)
    el.addEventListener('dblclick', () => {
      this.toggle()
    })
  }
}
export const fullscreen = new Fullscreen()
