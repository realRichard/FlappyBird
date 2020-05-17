class Background extends GameImage {
    constructor(game, name) {
        super(game, name)
        this.init()
    }

    init() {
        this.time = 0
        this.gap = config.fps.value * 5
    }

    draw() {
        super.draw()
        // log('texture', this.texture)
        this.game.drawImage(this)
    }

    update() {
        super.update()
        // log('time', this.time)
        this.time++
        if(this.time == this.gap) {
            this.time = -this.gap
        }
        if(this.time < 0) {
            this.texture = this.game.textureByName('background2')
        } else {
            this.texture = this.game.textureByName('background1')
        }
    }
}