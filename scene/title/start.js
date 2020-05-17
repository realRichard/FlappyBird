class StartScene extends Scene {
    constructor(game) {
        super(game)
        game.registerAction('b', function() {
            // start game
            var scene = new MainScene(game)
            game.replaceScene(scene)
        })
    }

    draw() {
        super.draw()
        // draw start scene
        this.game.context.font = "20px serif"
        this.game.context.fillText("press b to start game", 100, 250)
    }
}