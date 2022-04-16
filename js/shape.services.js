'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gShape


function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}


function createShape(pos = {x:0,y:0}) {
    gShape = {
        pos,
        size: 0,
        isDrag: false
    }
}


function getShape() {
    return gShape
}

function isShapeClicked(clickedPos) {
    var selectedLineIdx = gMeme.selectedLineIdx
    var isShape  = false
    //from some reason the foreacg didnt work
    // gMeme.lines.forEach(line => {

        for(var i=0;i< gMeme.lines.length;i++){
        var elText = gCtx.measureText(gMeme.lines[i].txt)
        gShape.size = elText.width
        var txtHeight = elText.actualBoundingBoxAscent + elText.actualBoundingBoxDescent
        if(gMeme.lines[i].align === 'center'){
            var x = ((gElCanvas.width - elText.width) -30) / 2  
            var endX = x + elText.width + 30
            var y = gMeme.lines[i].y - txtHeight + 5
            var endY = gMeme.lines[i].y +10
            if(clickedPos.x> x && clickedPos.x < endX &&
                clickedPos.y > y  && clickedPos.y < endY) {
                gShape.pos = {x:gMeme.lines[i].x,y: gMeme.lines[i].y}
                isShape = true
                return isShape
               
            }    
        } else if(gMeme.lines[i].align === 'left'){
            if(clickedPos.x > 0 && clickedPos.x < elText.width &&
                clickedPos.y < gMeme.lines[i].y && clickedPos.y > (gMeme.lines[i].y - txtHeight)) {
                    gShape.pos = {x:gMeme.lines[i].x,y: gMeme.lines[i].y}
                    isShape = true
                    return isShape
            }
        }  else if(gMeme.lines[i].align === 'right'){
            var x = gElCanvas.width - elText.width - 10
            if(clickedPos.x > x && clickedPos.x < gElCanvas.width &&
                clickedPos.y < gMeme.lines[i].y && clickedPos.y > (gMeme.lines[i].y - txtHeight)) {
                    isShape = true
                    return true
            }
        }     
        return isShape
    }    
}


function setShapeDrag(isDrag) {
    gShape.isDrag = isDrag
}

function moveShape(dx, dy) {
    var selectedLineIdx = gMeme.selectedLineIdx
    var elText = gCtx.measureText(gMeme.lines[selectedLineIdx].txt)
    var txtHeight = elText.actualBoundingBoxAscent + elText.actualBoundingBoxDescent

    if((gShape.pos.x + dx + elText.width) > gElCanvas.width -10 || (gShape.pos.x + dx ) < 10 ||
        (gShape.pos.y + dy) > gElCanvas.height - 10 || (gShape.pos.y + dy + txtHeight) < 10){
            return
        }
    gShape.pos.x += dx
    gMeme.lines[selectedLineIdx].x = gShape.pos.x
    gShape.pos.y += dy
    gMeme.lines[selectedLineIdx].y = gShape.pos.y  
}