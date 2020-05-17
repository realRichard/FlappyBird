var log = function() {
    console.log.apply(console, arguments)
}

var randomBewteen = function(begin, end) {
    var ran = Math.floor(Math.random() * (end - begin + 1))
    return ran + begin
}

var e = function(sel) {
    return document.querySelector(sel)
}

var es = function(sel) {
    return document.querySelectorAll(sel)
}
