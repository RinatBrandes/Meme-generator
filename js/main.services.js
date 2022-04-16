'use strict'

var idx = 1

var gImgs = []

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines:[]
}
var gEmojis = []
var gKeywordsSearchCountMap = {'crazy':0,'men':0,'pet':0,'happy':0,'cute':0,'baby':0,'scary':0}


//image
function createImages(){
    var images = []
    images = [
        _createImg(idx,'images/1.jpg',['crazy','men']),
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
    
    var indx = gImgs.findIndex(img => img.id === parseInt(gMeme.selectedImgId,10)) 
    return gImgs[indx].img
}


//line
function createLine(){
   
    return {
        txt: 'Enter some text',
        size: 22,
        align: 'center',
        strokeColor: '#000000',
        fillColor: '#ffe4c4',
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

    if(gMeme.lines.length > 3){
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
    var elText = Math.round(gCtx.measureText(gMeme.lines[selectedLineIdx].txt).width)
    if(elText + 50 > gElCanvas.width){
        setMsg('You can\'t write any more')
        return
    }
    gMeme.lines[selectedLineIdx].txt = userTxt     
}


function deleteLine(){
    
    var selectedLineIdx = gMeme.selectedLineIdx
    if(selectedLineIdx === gMeme.lines.length-1) {
        gMeme.lines.splice(selectedLineIdx,1)
    } else {
        for(var i = gMeme.lines.length-1;i > selectedLineIdx ;i--){
            gMeme.lines[i].y = gMeme.lines[i-1].y
        }
        gMeme.lines.splice(selectedLineIdx,1)
    }    
   
    if(gMeme.lines.length === 0 || selectedLineIdx === 0){
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx = gMeme.selectedLineIdx-1
    }
}

//meme
function getMeme(){
    return gMeme
}

function setMemeFontSize(diff){
    var selectedLineIdx = gMeme.selectedLineIdx
    var elText = gCtx.measureText(gMeme.lines[selectedLineIdx].txt) 
   
    var txtHeight = elText.actualBoundingBoxAscent + elText.actualBoundingBoxDescent
   if(diff === -2 && gMeme.lines[selectedLineIdx].size === 10){
        setMsg('You can\'t decrease any more')
        return
   }
        
    if((gMeme.lines[selectedLineIdx].y > gElCanvas.height) || 
        (gMeme.lines[selectedLineIdx].y - txtHeight - 10 < 0) ||
        (elText.width + 40 > gElCanvas.width)){     
            setMsg('You can\'t increase the size any more')
    } else {
            gMeme.lines[selectedLineIdx].size += diff
    }    
}    

function  setMemeColor(value){    
    
    var selectedLine = gMeme.selectedLineIdx
    if(value === 'fill-color' ) {
        var color = document.querySelector('.fill-color').value
        gMeme.lines[selectedLine].fillColor = color
    } else if(value === 'stroke-color' ) {
        var color = document.querySelector('.stroke-color').value
        gMeme.lines[selectedLine].strokeColor = color
    }    
}

function setMemeAlign(value){
    
    var selectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines[selectedLineIdx].align = value
       
    if(value === 'left'){
        gMeme.lines[selectedLineIdx].x = gElCanvas.width - (gElCanvas.width - 10)
    } else if (value === 'right'){                        
        gMeme.lines[selectedLineIdx].x = gElCanvas.width -10
    } else {        
        gMeme.lines[selectedLineIdx].x = (gElCanvas.width  / 2) 
    }
}

function getBackgroundSize(indx){
    var line = gMeme.lines[indx]
    var elText = gCtx.measureText(line.txt)
    gCtx.fillStyle =  'gray'
    var txtHeight = elText.fontBoundingBoxAscent + elText.fontBoundingBoxDescent
   
    if(line.align === 'center'){
        var background = {x: line.x - (elText.width/2) - 5, y: line.y + 5, width: elText.width + 10, height: txtHeight * -1}
        return background       
    } else if(line.align === 'left'){
        var background = {x: line.x - 5, y: line.y + 5, width: elText.width + 10, height: txtHeight * -1}
        return background        
    } else if (line.align === 'right'){
        var background = {x: line.x - elText.width - 5, y: line.y + 5, width: elText.width + 10, height: txtHeight * -1}
        return background
    }
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
    setTimeout(clearMsg, 3000)
}


function  setDirection(value){
    var selectedLineIdx = gMeme.selectedLineIdx
    var elText = gCtx.measureText(gMeme.lines[selectedLineIdx].txt)    
    var txtHeight = elText.fontBoundingBoxAscent + elText.fontBoundingBoxDescent
    if (value === 'up') {
        if(gMeme.lines[gMeme.selectedLineIdx].y - txtHeight  > 10 ){
            gMeme.lines[gMeme.selectedLineIdx].y -= 10          
        } else {
            setMsg('You can\'t move up')        
        }    
    } else if (value === 'down' && gMeme.lines[gMeme.selectedLineIdx].y + txtHeight < gElCanvas.height ){
        gMeme.lines[gMeme.selectedLineIdx].y += 10        
    } else {
        setMsg('You can\'t move down')
    }
    
}


function downloadImg(){

    const data = gElCanvas.toDataURL()
    var image = gElCanvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream")
    var link = document.createElement('a')
    link.download = 'MemeImg.jpg'
    link.href = image
    link.click()
}

function getEmoji(){
    return gEmojis
}

function addEmoji(name){

    var elEmoji = document.querySelector(name)
    var x = getRandomInt(20,gElCanvas.width -20)
    var y = getRandomInt(20,gElCanvas.height -20)
    gEmojis.push({x:x,y:y,name:name})
    
}
 
function searchKeyWord(key){
 
    var findKey =''
    Object.keys(gKeywordsSearchCountMap).forEach(keyword => {
         if(keyword === key){
            findKey = key
        }            
    })
    return findKey
}

function setGlobal(){
    var elSearch = document.querySelector('.search')
    elSearch.value =''
    gMeme.selectedLineIdx = 0
    gMeme.selectedImgId = 1
    gMeme.lines = []
    createLine()
    gEmojis = []
}
