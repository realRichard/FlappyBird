class Game {
    constructor(images, runCallback) {
        this.init(images, runCallback)
        this.loadImg()
    }

    init(images, runCallback) {
        window.fps = config.fps.value
        // images like this
        // name: path
        // images = {
        //     paddle: 'img/paddle.png',
        //     ball: 'img/ball.png',
        //     block: 'img/block.png',
        // }
        this.images = images
        // callback
        this.runCallback = runCallback
        // use to save img referrence
        // name: imgReferrence
        this.img = {}
        // could be change scene
        this.scene = null
        // key with action
        // key: function
        this.actions = {}
        // key with status
        // key: bool
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        var self = this
        // events
        window.addEventListener('keydown', function(event) {
            // log('event.key', '(' + event.key + ')', event.key.length)
            self.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function(event) {
            self.keydowns[event.key] = false
        })
    }

    loadImg() {
        var imageNames = Object.keys(this.images)
        // use to detect whether images loaded completely
        var count = 0
        for(let i = 0; i < imageNames.length; i++) {
            let name = imageNames[i]
            let img = new Image()
            img.src = this.images[name]
            // var self = this
            // img.onload = function() {
            //     // callback, now this is img(<img src="img/middleEnemy.png">)
            //     // log('this.img', this, img)
            //     self.img[name] = img
            //     count++
            //     if(count == imageNames.length) {
            //         // log('images onload', g.images)
            //         self.run()
            //     }
            // }

            // or use arrow function
            img.onload = () => {
                this.img[name] = img
                count++
                if(count == imageNames.length) {
                    // log('images onload', g.images)
                    this.run()
                }
            }
        }
    }

    registerAction = function(key, callback) {
        this.actions[key] = callback
    }

    // draw
    drawImage (img) {
        // log('Image background', img.texture, img.w)
        // log('this game img', this.img)
        this.context.drawImage(img.texture, img.x, img.y)
    }

    textureByName = function(name) {
        var self = this
        // log('game.img', g.img[name])
        var img = self.img[name]
        // log('img', g.img)
        return img
    }

    runloop() {
        var self = this
        // events
        // log('fps', window.fps)
        var actions = Object.keys(self.actions)
        // log('actions key', actions)
        for(var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(self.keydowns[key]) {
                // if keydown is true, call action
                // log('actions', g.actions[key])
                self.actions[key]()
            }
        }
        // update
        self.update()
        // clear
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)
        // draw
        self.draw()
        // next run lopp
        setTimeout(function() {
            self.runloop()
        }, 1000 / window.fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    runWithScene(scene) {
        var self = this
        self.scene = scene

        // timer
        setTimeout(function() {
            self.runloop()
        }, 1000 / window.fps)
    }

    debug() {
        window.fps = config.fps.value
    }

    update() {
        this.debug && this.debug()
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    run() {
        var self = this
        self.runCallback(self)
    }
}