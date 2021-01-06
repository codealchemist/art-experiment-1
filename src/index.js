import queryString from 'query-string'
import { onKey } from 'util'
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

const $canvas = document.getElementById('canvas')
$canvas.width = window.innerWidth
$canvas.height = window.innerHeight

const queryParams = queryString.parse(window.location.search)
console.log('PARAMS', queryParams)

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
  incrementalRect7
]

let current = 0
const total = experimentsMap.length
let timeoutRef
let playing = false
function loop() {
  playing = true
  if (current > total - 1) current = 0
  const experiment = experimentsMap[current]
  experiment()
  current++

  timeoutRef = setTimeout(loop, 1000 * 5)
}

onKey('ArrowLeft', () => {
  if (timeoutRef) {
    clearTimeout(timeoutRef)
    playing = false
  }
  let prev = current - 1
  if (prev < 0) prev = total - 1
  console.log('PREV', prev)
  current = prev
  const experiment = experimentsMap[prev]
  experiment()
})
onKey('ArrowRight', () => {
  if (timeoutRef) {
    clearTimeout(timeoutRef)
    playing = false
  }
  let next = current + 1
  if (next === total) next = 0
  console.log('NEXT', next)
  current = next
  const experiment = experimentsMap[next]
  experiment()
})
onKey('Space', () => {
  if (playing) return
  console.log('Slideshow')
  loop()
})

loop()
// incrementalCircles7()
