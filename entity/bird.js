class Bird extends GameImage {
    constructor(game, name) {
        super(game, name)
        this.init()
    }

    init() {
        this.x = 100
        this.y = 200
        this.vy = 2
        this.gy = 10
        this.coefficient = 0.01
        this.speed = config.birdSpeed.value
        this.frames = []
        this.frameIndex = 0
        this.frameCount = 5

        this.rotation = 0
        
        this.addFrames()

        this.flipX = false
        
        // log('this. frames', this.frames)
        var g = this.game
        g.registerAction(' ', () => {
            this.jump()
        })

        g.registerAction('a', () => {
            this.moveLeft()
        })

        g.registerAction('d', () => {
            this.moveRight()
        })
    }

    addFrames() {
        // hard code
        for(var i = 0; i < 3; i++) {
            var name = 'bird' + i
            var b = this.game.textureByName(name)
            this.frames.push(b)
        }
    }

    jump() {
        this.vy += -this.gy * this.coefficient * 7
        // this.vy = -this.vy
        this.y += this.vy
        this.rotation = -45
    }

    debug() {
        this.speed = config.birdSpeed.value
    }

    update() {
        super.update()
        this.debug && this.debug()
        this.vy += this.gy * this.coefficient
        this.y += this.vy 

        if(this.rotation < 45) {
            this.rotation += 2
        }
        
        if(this.frameCount > 0) {
            this.frameCount--
        }
        if(this.frameCount == 0) {
            this.frameCount = 5
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
        }
        if(this.frameIndex == 3) {
            this.frameIndex = 0
        }
        // log('this.index', this.frameIndex)
        this.texture = this.frames[this.frameIndex]

        if(this.y > this.scene.ground.y) {
            this.y = this.scene.ground.y
        }
        
    }

    draw() {
        super.draw()
        // flip 
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if(this.flipX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)
        context.restore()
        // log('bird draw', this.texture)
        // this.game.drawImage(this)
    }

    moveRight() {
        this.flipX = false
        this.x += this.speed
    }

    moveLeft() {
        this.flipX = true
        this.x -= this.speed
    }
}
