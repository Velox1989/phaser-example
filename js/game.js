var width
var height
var resize

const DEFAULT_WIDTH = 610
const DEFAULT_HEIGHT = 960
const MAX_WIDTH = DEFAULT_WIDTH * 2
const MAX_HEIGHT = DEFAULT_HEIGHT * 2
let SCALE_MODE = 'SMOOTH'

const config = {
  type: Phaser.WEBGL,
  backgroundColor: '#00ffff',
  parent: 'game',

  scale: {
    mode: Phaser.Scale.NONE,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },

  scene: [Loading, Level1]
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)

  const resize = () => {
    const w = window.innerWidth
    const h = window.innerHeight

    let width = DEFAULT_WIDTH
    let height = DEFAULT_HEIGHT
    let maxWidth = MAX_WIDTH
    let maxHeight = MAX_HEIGHT
    let scaleMode = SCALE_MODE

    let scale = Math.min(w / width, h / height)
    let newWidth = Math.min(w / scale, maxWidth)
    let newHeight = Math.min(h / scale, maxHeight)

    let defaultRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT
    let maxRatioWidth = MAX_WIDTH / DEFAULT_HEIGHT
    let maxRatioHeight = DEFAULT_WIDTH / MAX_HEIGHT

    // smooth scaling
    let smooth = 1
    if (scaleMode === 'SMOOTH') {
      const maxSmoothScale = 1.15
      const normalize = (value, min, max) => {
        return (value - min) / (max - min)
      }
      if (width / height < w / h) {
        smooth =
          -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) /
            (1 / (maxSmoothScale - 1)) +
          maxSmoothScale
      } else {
        smooth =
          -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) /
            (1 / (maxSmoothScale - 1)) +
          maxSmoothScale
      }
    }

    // resize the game
    game.scale.resize(newWidth * smooth, newHeight * smooth)

    // scale the width and height of the css
    game.canvas.style.width = newWidth * scale + 'px'
    game.canvas.style.height = newHeight * scale + 'px'

    // center the game with css margin
    game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`
    game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`
  }

  window.addEventListener('resize', event => {
    // console.log('resize, width: ' + width)
    // console.log('resize, height: ' + height)
    resize()
  })

  resize()
})
