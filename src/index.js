import queryString from 'query-string'
import Hammer from 'hammerjs'
import { onKey, onResize, setCanvasSize, fullscreen } from 'util'
import experiments from 'experiments'

const $canvas = document.getElementById('canvas')
setCanvasSize($canvas)
let stage = new createjs.Stage('canvas')
const params = queryString.parse(window.location.search)
const hammer = new Hammer($canvas)

let current = 0
const total = experiments.length
let timeoutRef
let playing = false
let autoRefreshing = false
function loop () {
  clearTimeout(timeoutRef)
  playing = true
  if (current > total - 1) current = 0
  render(current)
  current++
  timeoutRef = setTimeout(loop, 1000 * 5)
}

function render (index) {
  const experiment = experiments[index]
  stage.removeAllChildren()
  const url = `${window.location.origin}?experiment=${index}`
  window.history.pushState({}, `Experiment ${index}`, url)
  experiment(stage)
}

function autoRefresh () {
  autoRefreshing = true
  render(current)
  timeoutRef = setTimeout(autoRefresh, 360)
}

function next () {
  if (timeoutRef) {
    clearTimeout(timeoutRef)
    playing = false
    autoRefreshing = false
  }
  let next = current + 1
  if (next === total) next = 0
  console.log('NEXT', next)
  current = next
  render(next)
}

function prev () {
  if (timeoutRef) {
    clearTimeout(timeoutRef)
    playing = false
    autoRefreshing = false
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
  autoRefreshing = false
  loop()
})
onKey('Enter', () => {
  // Refresh.
  let index = current
  if (index > 0 && playing) index = current - 1
  autoRefreshing = false
  clearTimeout(timeoutRef)
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
hammer.on('swipeleft', event => {
  prev()
})
hammer.on('swiperight', event => {
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
