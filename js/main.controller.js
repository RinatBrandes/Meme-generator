"use strict"
var gElCanvas
var gCtx
var gStartPos

function onInit() {
    
  createImages()
  renderImages()
  initCanvas()
  // resizeCanvas()
  addMouseListeners()
}

function initCanvas() {
  gElCanvas = document.querySelector('#canvas')
  gCtx = gElCanvas.getContext('2d')
}

function renderImages(key = 'all') {

  var images = gImgs.slice()
  if(key !== 'all'){
    for(var i = images.length-1;i >= 0;i--){
      if(!images[i].keywords.includes(key)){
        images.splice(i,1)
      }
    }
  }  

  const strHTML = images.map(
    (image) =>
      ` <img class="img${image.id} img" src="${image.img}" onclick="openEditor(this)">
    `
  )
  var elImages = document.querySelector('.images')
  elImages.innerHTML = strHTML.join('')
}

function openEditor(selectedImg) {

  var elGallery = document.querySelector('.gallery')
  elGallery.style.display = 'none'

  var elCanvas = document.querySelector('.editor-container')
  elCanvas.style.display = 'flex'

  onSetSelectedImg(selectedImg)
  onAddLine()
  createShape()
  renderMeme()
}

function onSetSelectedImg(selectedImg) {

  var imgId = selectedImg.classList[0].substring(3)
  setSelectedImg(imgId)
}

function renderImg(selectedImg) {
  var img = new Image()
  img.src = selectedImg
  gCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
}


function renderMeme() {
  
  const image = getImg()
  renderImg(image)
  renderLines()
}

function renderLines() {
  
  var meme = getMeme()
  meme.lines.forEach((line,indx) => {  
      gCtx.beginPath()
      gCtx.lineWidth = 2
      gCtx.font = `${line.size}px impact`
      if(gMeme.selectedLineIdx === indx){        
        var backGround = getBackgroundSize(indx)
        gCtx.fillStyle =  'gray'
        gCtx.fillRect(backGround.x,backGround.y,backGround.width,backGround.height) 
      }      
      gCtx.textAlign = line.align
      gCtx.strokeStyle = line.strokeColor
      gCtx.fillStyle = line.fillColor
      gCtx.strokeText(line.txt, line.x, line.y)
      gCtx.fillText(line.txt, line.x, line.y)
  })
  var emojis = getEmoji()
    emojis.forEach((emoji) => {
      gCtx.beginPath()
      gCtx.font = '20px Arial'
      var elEmoji = document.querySelector(emoji.name)
      gCtx.strokeText(elEmoji.innerText, emoji.x, emoji.y)
    })  
}

function onAddLine() {

  addLine()
}

function onUpdateLine(e) {

  saveLineTxt(e.target.value)
  renderMeme()
}


function onIncFont() {

  setMemeFontSize(+2)
  renderMeme()
}

function onDecFont() {
  setMemeFontSize(-2)
  renderMeme()
}

function setFontColor(value) {

  setMemeColor(value)
  renderMeme()
}

function onSetAlign(value) {
  
  setMemeAlign(value)
  renderMeme()
}

function onSelectFont(value) {
  //Maybe on next round
}

function onSetDirection(value) {
    
  setDirection(value) 
  renderMeme()
}

function onSetNewLine() {
  addLine()
  renderMeme()
}

function onSwitchLine(){
  switchLine()
  renderMeme()
}

function onDeleteLine(){
  deleteLine()
  renderMeme()
}

function onDownloadImg(){
  downloadImg()
}

function onAddEmoji(name){
    
  addEmoji(name)
  renderMeme()
}

// function resizeCanvas() { 
//   const elContainer = document.querySelector('.canvas-container')
//   console.log('elContainer.offsetWidth', elContainer)
//   console.log('elContainer.offsetHeight', elContainer.offsetHeight)
//   gElCanvas.width = elContainer.offsetWidth
//   gElCanvas.height = elContainer.offsetHeight
// }


function addListeners() {
  addMouseListeners()
  addTouchListeners()
  // window.addEventListener('resize', () => {
  //     // resizeCanvas()
  //     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
  //     createShape()
  //     renderCanvas()
  // })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}


function onDown(ev) {

  const pos = getEvPos(ev)
  if (!isShapeClicked(pos)) return
  setShapeDrag(true)
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}


function onMove(ev) {
  
  const shape = getShape();
  if (!shape.isDrag) return
  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveShape(dx, dy)
  gStartPos = pos
  renderMeme()
}

function onUp() {
  setShapeDrag(false)
  document.body.style.cursor = 'grab'
}


function onSearch(e){
  
  var keyResult = searchKeyWord(e.target.value)
  if(keyResult === '') {
    renderImages('all')
  } else {
    renderImages(keyResult)
  }  
}

function onBackHome(){
  
  var elGallery = document.querySelector(".gallery")
  elGallery.style.display = "flex"
  var elCanvas = document.querySelector(".editor-container")
  elCanvas.style.display = "none"
 
  setGlobal()
  renderImages('all')
}
