class Loading extends Phaser.Scene
{    
    constructor()
    {
        super({
            
            key   : 'loading',
            pack  : 
            {
                files : 
                [
                    { type: 'image', key: 'preloader1', url: 'images/preloader1.png' },
                    { type: 'image', key: 'preloader2', url: 'images/preloader2.png' },
                    { "type": "bitmapFont",
                      "key": "os_white_extra_bold",
                      "textureURL": "fonts/os_white_extra_bold.png",
                      "fontDataURL": "fonts/os_white_extra_bold.fnt" },
                    { "type": "bitmapFont",
                      "key": "open_sans_extra_bold",
                      "textureURL": "fonts/open_sans_extra_bold.png",
                      "fontDataURL": "fonts/open_sans_extra_bold.fnt" },
                ] 
            }
        })
    }
    
    setPreloadSprite (sprite)
	{
		this.preloadSprite = { sprite: sprite, width: sprite.width, height: sprite.height }
		sprite.visible = true
		// set callback for loading progress updates
		this.load.on('progress', this.onProgress, this )
	}
	
	onProgress (value) 
    {
		if (this.preloadSprite)
		{
			// calculate width based on value=0.0 .. 1.0
			let w = Math.floor(this.preloadSprite.width * value)
			// set width of sprite			
			this.preloadSprite.sprite.frame.width = w
			this.preloadSprite.sprite.frame.cutWidth = w
			// update screen
			this.preloadSprite.sprite.frame.updateUVs()
		}
	}
    
    preload(){
        
        width = this.cameras.main.width;
        height = this.cameras.main.height;
        
        console.log("width: " + width)
        console.log("height: " + height)

        // preloader bar
		this.preloader1 = this.add.sprite(width/2, height/2 + 100, "preloader1")
		this.preloader2 = this.add.sprite(width/2, height/2 + 100, "preloader2")
		this.setPreloadSprite(this.preloader2)
        
        // website and game title
        this.website = this.add.bitmapText(width/2, height/2 - 150, "open_sans_extra_bold", "website logo", 50)
        this.title = this.add.bitmapText(width/2, height/2 - 50, "os_white_extra_bold", "game title", 36)
        this.website.setOrigin(0.5,0)
        this.title.setOrigin(0.5,0)
        
        this.load.image('button_play', 'images/button_play.png')
        
        this.load.image('map', 'images/map.png')
    }
    
    create()
    {    
        // play button
        this.button_play = this.add.image(width/2, height/2 + 100, 'button_play')
        this.button_play.setInteractive({useHandCursor: true})
        this.button_play.on('pointerup', function(){ 
            this.scene.start("level1")
            console.log("click")
        },this)
        
        this.preloader1.visible = false
        this.preloader2.visible = false

        // resize
        const resize = () => {
            width = this.cameras.main.width;
            height = this.cameras.main.height;

            this.button_play.setPosition(width/2, height/2 + 100)
            this.website.setPosition(width/2, height/2 - 150)
            this.title.setPosition(width/2, height/2 - 50)
        }      
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.cameras.resize(gameSize.width, gameSize.height)
            resize()
        })
        resize()
        

    }
}