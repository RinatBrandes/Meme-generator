'use strict'

var idx = 1

var gImgs = []

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines:[]
}


function createImages(){
    var images = []
    images = [_createImg(idx,'images/1.jpg',['crazy','men']),
    _createImg(idx, 'images/2.jpg',['pet','happy','cute']),
    _createImg(idx,'images/3.jpg',['pet','happy','cute','baby']),
    _createImg(idx,'images/4.jpg',['pet','cute']),
    _createImg(idx,'images/5.jpg',['baby','crazy']),
    _createImg(idx,'images/6.jpg',['men','happy']),
    _createImg(idx,'images/7.jpg',['baby','cute']),
    _createImg(idx,'images/8.jpg',['men','happy']),
    _createImg(idx,'images/9.jpg',['baby','happy','funny']),
    _createImg(idx,'images/10.jpg',['men','happy']),
    _createImg(idx,'images/11.jpg',['men']),
    _createImg(idx,'images/12.jpg',['men']),
    _createImg(idx,'images/13.jpg',['men','happy','cute']),
    _createImg(idx,'images/14.jpg',['men','scary']),
    _createImg(idx,'images/15.jpg',['men','cute']),
    _createImg(idx,'images/16.jpg',['men','happy']),
    _createImg(idx,'images/17.jpg',['men','crazy']),
    _createImg(idx,'images/18.jpg',['happy'])
   ] 

   gImgs = images
}

function _createImg(id,img,keys){
    idx++
    return {
        id: id,
        img: img,
        keywords: keys
    }
}

function setSelectedImg(imgId){
    gMeme.selectedImgId = imgId
}

function getImg(){
    return gImgs[gMeme.selectedImgId-1].img
}

function getMeme(){
    return gMeme
}

function createLine(){
   
        return {
            txt: 'Enter some text',
            size: 22,
            align: 'center',
            strokeColor: '#000000',
            fiilColor: '#FFFFFF',
            x: calcX(), 
            y: calcY()
        }
}

function calcX(){
   
    return gElCanvas.width / 2
}

function calcY(){
    if (gMeme.lines.length === 0){
        return 50
    } else if (gMeme.lines.length === 1){
        return  gElCanvas.height - 30
    } else {
       
        return  (gElCanvas.height / 2) + ((gMeme.lines.length-2) * 50)
    }
}

function addLine(){

    // var temp = gMeme.lines.find(line => {
    //     line.txt = 'deleted'
    // })

    // if(gMeme.lines.length > 3 &&){

    if(gMeme.lines.length > 3){
        console.log('gMeme', gMeme)
        if((gMeme.lines[gMeme.lines.length-1].y + 75) >= gMeme.lines[1].y){
            setMsg('You can\'t add any more rows')
            return
        }
    }    
    gMeme.lines.push(createLine())
    gMeme.selectedLineIdx = gMeme.lines.length-1
    var elTxt = document.querySelector('.text')
    elTxt.value = 'Enter some text'    
}



function saveLineTxt(userTxt){
    var selectedLineIdx = gMeme.selectedLineIdx
    console.log('gmeme', gMeme)
    var elText = Math.round(gCtx.measureText(gMeme.lines[selectedLineIdx].txt).width)
    if(elText + 50 > gElCanvas.width){
        setMsg('You can\'t write any more')
        return
    }
    gMeme.lines[selectedLineIdx].txt = userTxt 
  
    console.log('gmeme', gMeme)
}

function setMemeFontSize(diff){
    var selectedLineIdx = gMeme.selectedLineIdx
    var elText = gCtx.measureText(gMeme.lines[selectedLineIdx].txt) 
   
    var txtHeight = elText.actualBoundingBoxAscent + elText.actualBoundingBoxDescent
   console.log('gMeme.lines[selectedLineIdx].y - txtHeight < 10', gMeme.lines[selectedLineIdx].y - txtHeight < 10)
   console.log('elText.width + 40 > gElCanvas.width', elText.width + 40 > gElCanvas.width)
    if(selectedLineIdx === 0){
        // var calcY =  gMeme.lines[selectedLineIdx].y - txtHeight
        // console.log( '= user y',gMeme.lines[selectedLineIdx].y, '- text he', txtHeight)

        if(gMeme.lines[selectedLineIdx].align === 'center' && 
             gMeme.lines[selectedLineIdx].y - txtHeight < 10  || elText.width + 20 > gElCanvas.width){     
                setMsg('You cant increase the size any more')
        } else if((gMeme.lines[selectedLineIdx].align === 'left')  &&
            (gMeme.lines[selectedLineIdx].y - txtHeight < 10)  || (elText.width + 40 > gElCanvas.width)){            
                setMsg('You cant increase the size any more')
        } else {

            gMeme.lines[selectedLineIdx].size += diff
        }

    } else if(selectedLineIdx === 1){
        // var calcY =  gMeme.lines[selectedLineIdx].y + txtHeight
        console.log( '= user y',gMeme.lines[selectedLineIdx].y, '- text he', txtHeight)
        if(gMeme.lines[selectedLineIdx].align === 'center' &&  elText.width + 40 > gElCanvas.width ){
            setMsg('You cant increase the size any more')
        } else if (gMeme.lines[selectedLineIdx].align === 'left'  && elText.width + 50 > gElCanvas.width ){
            setMsg('You cant increase the size any more')
        } else {
            gMeme.lines[selectedLineIdx].size += diff
        }

    } else if(selectedLineIdx === 2 ){
            if (gMeme.lines[selectedLineIdx].align === 'center' && (elText.width + 40 > gElCanvas.width)){
                setMsg('You cant increase the size any more')
            } else if(gMeme.lines[selectedLineIdx].align === 'left' && elText.width + 50 > gElCanvas.width){
                setMsg('You cant increase the size any more')
            } else {
                gMeme.lines[selectedLineIdx].size += diff
            }

    } else if(selectedLineIdx > 2){
            if (gMeme.lines[selectedLineIdx].align === 'center' && (elText.width + 40 > gElCanvas.width ||
                (gMeme.lines[selectedLineIdx].y -txtHeight -10 < gMeme.lines[selectedLineIdx-1].y)) ){
                setMsg('You cant increase the size any more')
            } else if(gMeme.lines[selectedLineIdx].align === 'left' && elText.width + 50 > gElCanvas.width || 
                (gMeme.lines[selectedLineIdx].y - txtHeight -10 < gMeme.lines[selectedLineIdx-1].y)){
                setMsg('You cant increase the size any more')
            } else {
                gMeme.lines[selectedLineIdx].size += diff
            }
        }
        //  else {
        //     gMeme.lines[selectedLineIdx].size += diff
        // }   
    
   
    console.log('gmeme', gMeme)
}    

function  setMemeColor(color){

    console.log('gmeme', gMeme)
    
    var selectedLine = gMeme.selectedLineIdx
    console.log('selectedLine',selectedLine )
    gMeme.lines[selectedLine].color = color
    console.log('gmeme', gMeme)
}

function setMemeAlign(value){
    
    var selectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines[selectedLineIdx].align = value
    
    // var elText = gCtx.measureText(gMeme.lines[selectedLineIdx].txt) 
    // elText = Math.round(elText.width)  
    // console.log('elText',elText )
    if(value === 'left'){
        gMeme.lines[selectedLineIdx].x = gElCanvas.width - (gElCanvas.width - 10)
    } else if (value === 'right'){                
        
        gMeme.lines[selectedLineIdx].x = gElCanvas.width -20
    } else {
        
        gMeme.lines[selectedLineIdx].x = (gElCanvas.width  / 2) 
    }
    console.log('gmeme', gMeme)
}


function handelSelectedLine(){
    var selectedLineIdx = gMeme.selectedLineIdx
    gCtx.font = gMeme.lines[selectedLineIdx].size+ 'px impact'
    var textWidth = gCtx.measureText(gMeme.lines[selectedLineIdx].txt).width
    var border = {
        x:0,
        y:0,
        width:0,
        height:0
    }

    if(gMeme.lines[selectedLineIdx].txt === ''){
        border = {
            x:0,
            y:0,
            width:0,
            height:0
        }
        return border
    }
    var elText = gCtx.measureText(gMeme.lines[selectedLineIdx].txt)    
    var txtHeight = elText.fontBoundingBoxAscent + elText.fontBoundingBoxDescent;
    
    if(gMeme.lines[selectedLineIdx].align === 'center'){
        border.x = ((gElCanvas.width - textWidth) -30) / 2       
    } else if(gMeme.lines[selectedLineIdx].align === 'left'){
        border.x = gMeme.lines[selectedLineIdx].x -10
    } else {
        border.x = gElCanvas.width - textWidth - 30
    }
    border.width = textWidth + 20

    border.y = gMeme.lines[selectedLineIdx].y - txtHeight + 5
    border.height = txtHeight +10
        
    return border
}

function  switchLine(){
    
    if(gMeme.selectedLineIdx+1 === gMeme.lines.length){
        gMeme.selectedLineIdx = 0
    } else if(gMeme.selectedLineIdx+1 < gMeme.lines.length){
        gMeme.selectedLineIdx++ 
    }
    
}

function clearMsg(){
    var elMsg = document.querySelector('.msg')
    elMsg.innerText = ''
}

function setMsg(msg){
    var elMsg = document.querySelector('.msg')            
    elMsg.innerText = msg
    setTimeout(clearMsg, 5000);

}


function  setDirection(value){

    if (value === 'up') {
        if(gMeme.lines[gMeme.selectedLineIdx].y -10 > 10 ){
            gMeme.lines[gMeme.selectedLineIdx].y -= 10          
        } else {
            setMsg('You can\'t move up')        
        }    
    } else if (value === 'down' && gMeme.lines[gMeme.selectedLineIdx].y + 10 < gElCanvas.height ){
        gMeme.lines[gMeme.selectedLineIdx].y += 10        
    } else {
        setMsg('You can\'t move down')
    }
    
}

function deleteLine(){
    //i'm not really deleting only clear the object
    var selectedLineIdx = gMeme.selectedLineIdx
    // gMeme.lines.splice(selectedLineIdx,1)
    // console.log('', gMeme)
    gMeme.lines[selectedLineIdx].txt = ''
    gMeme.lines[selectedLineIdx].size = 22
    gMeme.lines[selectedLineIdx].align = 'center'
    gMeme.lines[selectedLineIdx].strokeColor = '#000000'
    gMeme.lines[selectedLineIdx].fiilColor = '#FFFFFF'
    console.log('',gMeme )
    if(gMeme.lines.length === 0 || selectedLineIdx === 0){
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx = gMeme.selectedLineIdx-1
    }
    console.log('',gMeme )
}
