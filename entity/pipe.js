class Pipe {
    constructor(game) {
        this.init(game)
    }

    init(game) {
        this.game = game
        this.columnOfPipe = 5
        this.pipes = []
        this.pipeDistance = config.pipeDistance.value
        this.pipeSpace = config.pipeSpace.value
        this.pipeSpeed = config.pipeSpeed.value
        for(var i = 0; i < this.columnOfPipe; i++) {
            var p1 = new GameImage(this.game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.pipeDistance
            // log('x, y', p1.x, p1.y)
            var p2 = new GameImage(this.game, 'pipe')
            p2.x = p1.x
            this.resetPositon(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
        // log('pipes', this.pipes)
    }

    resetPositon(p1, p2) {
        p1.y = randomBewteen(-400, -300)
        p2.y = p1.y + p1.texture.height + this.pipeSpace
    }

    draw() {
        var context = this.game.context
        for(var i = 0; i < this.pipes.length; i++) {
            var p = this.pipes[i]
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)
            context.restore()
        }
    }

    collide(bird, pipe) {
        if(bird.x > pipe.x && bird.x < pipe.x + pipe.texture.width) {
            if(bird.y > pipe.y && bird.y < pipe.y + pipe.texture.height) {
                return true
            }
        }
        return false
    }

    debug() {
        this.pipeDistance = config.pipeDistance.value
        this.pipeSpace = config.pipeSpace.value
        this.pipeSpeed = config.pipeSpeed.value
    }

    update() {
        this.debug && this.debug()
        for(var i = 0; i < this.pipes.length; i++) {
            var p = this.pipes[i]
            // log('pipe x', p.x, p.y)
            p.x -= this.pipeSpeed
            if(p.x < -100) {
                p.x += this.columnOfPipe * this.pipeDistance
            }
            // if(this.collide(this.scene.bird, p)) {
            //     this.scene.over = true
            // }
        }
        for(var i = 0; i < this.pipes.length; i += 2) {
            var p1 = this.pipes[i]
            p1.x -= this.pipeSpeed
            var p2 = this.pipes[i + 1]
            p2.x -= this.pipeSpeed
            if(p1.x < -100) {
                p1.x += this.columnOfPipe * this.pipeDistance
                p2.x = p1.x
                this.resetPositon(p1, p2)
            }
            if(this.collide(this.scene.bird, p1)) {
                this.scene.over = true
            }
            if(this.collide(this.scene.bird, p2)) {
                this.scene.over = true
            }
        }
    }
}


