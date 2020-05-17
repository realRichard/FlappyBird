class GameImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.w = this.texture.width
        this.h = this.texture.height
        this.x = 0
        this.y = 0
        // log('this texture image', this.texture)
        this.flipY = false
        this.rotation = 0
    }

    draw() {
        
    }

    update() {
        
    }
}