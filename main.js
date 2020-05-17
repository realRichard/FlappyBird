var __main = function() {
    var images = {
        bird0: 'img/bird0.png',
        bird1: 'img/bird1.png',
        bird2: 'img/bird2.png',
        background1: 'img/bgDay.png',
        background2: 'img/bgNight.png',
        ground: 'img/ground.png',
        pipe: 'img/pipeUp.png',
    }

    var game =  new Game(images, function(game) {
        var start = new StartScene(game)

        game.runWithScene(start)
    })
}


__main()