class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'level1' })
  }

  create() {
    // map
    this.map = this.add.sprite(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'map'
    )

    this.map.setInteractive({
      pixelPerfect: true,
      alphaTolerance: 1,
      draggable: true,
      dropZone: true,
      useHandCursor: true
    })
    this.map.on('pointerdown', () => {
      console.log('click')
    })

    // resize
    const resize = () => {
      // adjust positions and size of all sprites in here
      console.log('resize')
    }
    this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
      this.cameras.resize(gameSize.width, gameSize.height)
      resize()
    })
    resize()
  }
}
