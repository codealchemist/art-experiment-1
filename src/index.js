import queryString from 'query-string'
import Hammer from 'hammerjs'
import { onKey, onResize, setCanvasSize, fullscreen } from 'util'
import randomCircles from 'experiments/random-circles'
import incrementalCircles1 from 'experiments/incremental-circles-1'
import incrementalCircles2 from 'experiments/incremental-circles-2'
import incrementalCircles3 from 'experiments/incremental-circles-3'
import incrementalCircles4 from 'experiments/incremental-circles-4'
import incrementalCircles5 from 'experiments/incremental-circles-5'
import incrementalCircles6 from 'experiments/incremental-circles-6'
import incrementalCircles7 from 'experiments/incremental-circles-7'
import incrementalCircles8 from 'experiments/incremental-circles-8'
import incrementalCircles9 from 'experiments/incremental-circles-9'
import incrementalCircles10 from 'experiments/incremental-circles-10'
import incrementalRect1 from 'experiments/incremental-rect-1'
import incrementalRect2 from 'experiments/incremental-rect-2'
import incrementalRect3 from 'experiments/incremental-rect-3'
import incrementalRect4 from 'experiments/incremental-rect-4'
import incrementalRect5 from 'experiments/incremental-rect-5'
import incrementalRect6 from 'experiments/incremental-rect-6'
import incrementalRect7 from 'experiments/incremental-rect-7'
import incrementalRect8 from 'experiments/incremental-rect-8'

const $canvas = document.getElementById('canvas')
setCanvasSize($canvas)
let stage = new createjs.Stage('canvas')
const params = queryString.parse(window.location.search)
const hammer = new Hammer($canvas)

const experimentsMap = [
  randomCircles,
  incrementalCircles1,
  incrementalCircles2,
  incrementalCircles3,
  incrementalCircles4,
  incrementalCircles5,
  incrementalCircles6,
  incrementalCircles7,
  incrementalCircles8,
  incrementalCircles9,
  incrementalCircles10,
  incrementalRect1,
  incrementalRect2,
  incrementalRect3,
  incrementalRect4,
  incrementalRect5,
  incrementalRect6,
  incrementalRect7,
  incrementalRect8
]

let current = 0
const total = experimentsMap.length
let timeoutRef
let playing = false
let autoRefreshing = false
function loop() {
  clearTimeout(timeoutRef)
  playing = true
  if (current > total - 1) current = 0
  render(current)
  current++
  timeoutRef = setTimeout(loop, 1000 * 5)
}

function render(index) {
  const experiment = experimentsMap[index]
  stage.removeAllChildren()
  experiment(stage)
}

function autoRefresh() {
  autoRefreshing = true
  render(current)
  timeoutRef = setTimeout(autoRefresh, 1000)
}

function next() {
  if (timeoutRef) {
    clearTimeout(timeoutRef)
    playing = false
  }
  let next = current + 1
  if (next === total) next = 0
  console.log('NEXT', next)
  current = next
  render(next)
}

function prev() {
  if (timeoutRef) {
    clearTimeout(timeoutRef)
    playing = false
  }
  let prev = current - 1
  if (prev < 0) prev = total - 1
  console.log('PREV', prev)
  current = prev
  render(prev)
}

onKey('ArrowLeft', () => {
  prev()
})
onKey('ArrowRight', () => {
  next()
})
onKey('Space', () => {
  if (playing) return
  console.log('Slideshow')
  loop()
})
onKey('Enter', () => {
  // Refresh.
  let index = current
  if (index > 0 && playing) index = current - 1
  render(index)
})
onKey('p', () => {
  // Stop.
  if (autoRefreshing) {
    autoRefreshing = false
    clearTimeout(timeoutRef)
    console.log('Auto refresh stopped.')
    return
  }

  // Constantly refresh current experiment.
  console.log('Auto refresh current experiment.')
  if (playing) {
    clearTimeout(timeoutRef)
    playing = false
    current = current - 1
  }
  autoRefresh()
})
onResize(() => {
  setCanvasSize($canvas)
  stage = new createjs.Stage('canvas')
  let index = current
  if (index > 0 && playing) index = current - 1
  render(index)
}, 100)
hammer.on('swipeleft', (event) => {
  prev()
})
hammer.on('swiperight', (event) => {
  next()
})
hammer.on('doubletap', () => {
  fullscreen.toggle()
})

if (params.experiment) {
  const index = parseInt(params.experiment, 10)
  render(index)
  current = index
} else {
  loop()
}
