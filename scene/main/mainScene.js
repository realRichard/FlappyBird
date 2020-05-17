class MainScene extends Scene {
    constructor(game) {
        super(game)
        this.init()
    }

    init() {
        this.paused = false
        this.over = false
        this.time = 0
        this.frame = 0
        this.background = new Background(this.game, 'background1')
        this.background.scene = this
        this.ground = new Ground(this.game, 'ground')
        this.ground.scene = this
        this.bird = new Bird(this.game, 'bird1')
        this.bird.scene = this
        this.pipe = new Pipe(this.game)
        this.pipe.scene = this
        // pause and resume the game
        // fuck, callback, this this this
        // window.addEventListener('keyup', function(event) {
        //     var k = event.key
        //     // log('keydown', event, typeof k, k)
        //     if(k == 'p') {
        //         this.paused = !this.paused
        //         log('this.paused', this.paused)
        //     }
        // })
        window.addEventListener('keydown', (event) =>  {
            var k = event.key
            // log('keydown', event, typeof k, k)
            if(k == 'p') {
                this.paused = !this.paused
                // log('this.paused', this.paused)
            }
        })
    }

    showScore() {
        var h3 = e('.time')
        h3.innerText = 'Time: ' + this.time
    }

    update() {
        if(this.paused) {
            return
        }
        if(this.over) {
            this.bird.y = this.ground.y
            return 
        }
        this.frame++
        if(this.frame == config.fps.value) {
            this.frame = 0
            this.time++
        }
        super.update()
        this.background.update()
        this.pipe.update()
        this.ground.update()
        this.bird.update()
        this.showScore()
    }

    draw() {
        super.draw()
        this.background.draw()
        this.pipe.draw()
        this.ground.draw()
        this.bird.draw()
    }
}