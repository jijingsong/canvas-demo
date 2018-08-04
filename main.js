var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

fullWidth()
window.onresize = function () {
    fullWidth()
}

listenToUser(canvas)
function listenToUser(canvas) {
    var using = false
    var beforePoint = { x: undefined, y: undefined }

    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            using = true

            if (eraserEnabled) {
                c.clearRect(x, y, 10, 10)
            } else {
                beforePoint = { x: x, y: y }
            }

        }
        canvas.ontouchmove = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            if (!using) { return }

            if (eraserEnabled) {
                c.clearRect(x, y, 10, 10)
            } else {
                var afterPoint = { x: x, y: y }
                drawLine(beforePoint.x, beforePoint.y, afterPoint.x, afterPoint.y)
                beforePoint = afterPoint
            }

        }
        canvas.ontouchend = function (e) {
            using = false
        }
    } else {
        canvas.onmousedown = function (e) {
            var x = e.clientX
            var y = e.clientY
            using = true

            if (eraserEnabled) {
                c.clearRect(x, y, 10, 10)
            } else {
                beforePoint = { x: x, y: y }
            }

        }
        canvas.onmousemove = function (e) {
            var x = e.clientX
            var y = e.clientY
            if (!using) { return }

            if (eraserEnabled) {
                c.clearRect(x, y, 10, 10)
            } else {
                var afterPoint = { x: x, y: y }
                drawLine(beforePoint.x, beforePoint.y, afterPoint.x, afterPoint.y)
                beforePoint = afterPoint
            }

        }
        canvas.onmouseup = function (e) {
            using = false
        }
    }
}

var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions show'
}
draw.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
}


function fullWidth() {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
}

function drawLine(x1, y1, x2, y2) {
    c.beginPath()
    c.moveTo(x1, y1)
    c.lineWidth = 5
    c.lineTo(x2, y2)
    c.stroke()
}
function drawCircle(x, y, radius) {
    c.beginPath()
    c.arc(x, y, radius, 0, Math.PI * 2)
    c.stroke()
}