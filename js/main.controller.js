"use strict";
var gElCanvas;
var gCtx;

function onInit() {
    
  createImages();
  renderImages();
  initCanvas();
}

function initCanvas() {
  gElCanvas = document.querySelector("#canvas");
  gCtx = gElCanvas.getContext("2d");
}

function renderImages() {
  var images = gImgs;

  const strHTML = images.map(
    (image) =>
      ` <img class="img${image.id} img" src="${image.img}" onclick="openEditor(this)">
    `
  );
  var elImages = document.querySelector(".images");
  elImages.innerHTML = strHTML.join("");
}

function openEditor(selectedImg) {
  console.log("selectedImg", selectedImg)
  var elGallery = document.querySelector(".grid-container")
  elGallery.style.display = "none"

  var elCanvas = document.querySelector(".editor-container")
  elCanvas.style.display = "flex"

  onSetSelectedImg(selectedImg)
  onAddLine()
  renderMeme()
}

function onSetSelectedImg(selectedImg) {

  var imgId = selectedImg.classList[0].substring(3);
  setSelectedImg(imgId);
}

function renderImg(selectedImg) {
  var img = new Image();
  img.src = selectedImg;
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height); //img,x,y,xend,yend
}


function renderMeme() {
  
  const image = getImg();
  renderImg(image);
  renderLines();
}

function renderLines() {
  var meme = getMeme();

  
console.log('',meme)
  meme.lines.forEach((line) => {
      gCtx.beginPath();
      gCtx.lineWidth = 2;
      gCtx.font = `${line.size}px impact`;
      gCtx.textAlign = line.align;
      gCtx.strokeStyle = line.strokeColor;
      gCtx.fillStyle = line.fillColor
      gCtx.strokeText(line.txt, line.x, line.y);
      gCtx.fillText(line.txt, line.x, line.y);        
      gCtx.strokeStyle = "red";
      var border = handelSelectedLine();
      gCtx.strokeRect(border.x, border.y, border.width, border.height);
      
  });
}

function onAddLine() {

  addLine()
}

function onUpdateLine(e) {

  saveLineTxt(e.target.value);
  renderMeme();
}


function onIncFont() {

  setMemeFontSize(+2);
  renderMeme();
}

function onDecFont() {
  setMemeFontSize(-2);
  renderMeme()
}

function setFontColor(value) {

  setMemeColor(value)
  renderMeme()
}

function onSetAlign(value) {
  
  setMemeAlign(value);
  renderMeme();
}

function onSelectFont(value) {
  //Maybe on next round
}

function onSetDirection(value) {
    setDirection(value) 
    renderMeme()
}

function onSetNewLine() {
  addLine();  
  renderMeme();
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