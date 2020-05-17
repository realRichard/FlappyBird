var bindAll = function(sel, eventName, callback) {
    var all = es(sel)
    for(var i = 0; i < all.length; i++) {
        var a = all[i]
        a.addEventListener(eventName, function(event) {
            callback(event)
        })
    }
}

var template = function(key, item) {
    var t = `
        <div>
            <label for="">
                <input type="range" value="${item.value}" class="auto-slide" data-value="config.${key}.value" max="${item.max}">
                ${item.description}: <span class="speed"></span>
            </label>
        </div>
    `
    return t
}

var ganerateControls = function() {
    var keys = Object.keys(config)
    // log('keys length', keys, keys.length)
    var control = e('.controls')
    for(var i = 0; i < keys.length; i++) {
        var key = keys[i]
        var item = config[key]
        var t = template(key, item)
        control.insertAdjacentHTML('beforeend', t)
    }
}

var enableDebugMode = function(bool) {
    if(!bool) {
        return 
    }

    ganerateControls()

    bindAll('.auto-slide', 'input', function(event) {
        // log('event', event)
        var target = event.target
        var value = target.value
        var key = target.dataset.value
        log('key', key)
        eval(key + '=' + value)
        // spell lable, wc, should copy
        var label = target.closest('label')
        // log('lable', label)
        label.querySelector('.speed').innerHTML = value
    })
}

var __debug = function() {
    enableDebugMode(true)
}

__debug()