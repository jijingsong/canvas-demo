var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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
                ctx.clearRect(x, y, 20, 20)
            } else {
                beforePoint = { x: x, y: y }
            }

        }
        canvas.ontouchmove = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            if (!using) { return }

            if (eraserEnabled) {
                ctx.clearRect(x, y, 20, 20)
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
                ctx.clearRect(x, y, 10, 10)
            } else {
                beforePoint = { x: x, y: y }
            }

        }
        canvas.onmousemove = function (e) {
            var x = e.clientX
            var y = e.clientY
            if (!using) { return }

            if (eraserEnabled) {
                ctx.clearRect(x, y, 10, 10)
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
    draw.classList.remove('active')
    eraser.classList.add('active')
}
draw.onclick = function () {
    eraserEnabled = false
    eraser.classList.remove('active')
    draw.classList.add('active')
}

var color = document.getElementsByClassName('color')[0]
var colorLi = color.children
for (var i = 0; i < colorLi.length; i++) {
    colorLi[i].onclick = function () {
        for (var j = 0; j < colorLi.length; j++) {
            colorLi[j].classList.remove('active')
        }
        this.classList.add('active')
        ctx.strokeStyle = this.id
    }
}

var lineWidth = 3;
thin.onclick = function () {
    lineWidth = 3
    thick.classList.remove('active')
    thin.classList.add('active')
}
thick.onclick = function () {
    lineWidth = 6
    thin.classList.remove('active')
    thick.classList.add('active')
}

clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

save.onclick = function () {
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href=image;
}

function fullWidth() {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineWidth = lineWidth
    ctx.lineTo(x2, y2)
    ctx.stroke()
}
function drawCircle(x, y, radius) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.stroke()
}
