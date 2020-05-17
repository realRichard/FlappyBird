class Ground extends GameImage {
    constructor(game, name) {
        super(game, name)
        this.init()
    }

    init() {
        this.y = 512 - 100
        this.grounds = []
        for(var i = 0; i < 13; i++) {
            var g = new GameImage(this.game, 'ground')
            g.x = i * g.texture.width
            g.y = 512 - g.texture.height
            this.grounds.push(g)
        }
        this.frameCount = 10
        this.speed = this.texture.width / 10
    }

    draw() {
        super.draw()
        for(var i = 0; i < this.grounds.length; i++) {
            var g = this.grounds[i]
            this.game.drawImage(g)
        }
    }

    update() {
        super.update()
        this.frameCount--
        for(var i = 0; i < this.grounds.length; i++) {
            var g = this.grounds[i]
            g.x -= this.speed
        }
        if(this.frameCount == 0) {
            this.frameCount = 10
            for(var i = 0; i < this.grounds.length; i++) {
                var g = this.grounds[i]
                g.x += this.speed * 10
            }
        }
    }
}