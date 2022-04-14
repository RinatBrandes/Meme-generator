"use strict";
var gElCanvas;
var gCtx;

function onInit() {
  createImages();
  renderImages();
  initCanvas();
  // eventListeneres()
}

// function eventListeneres(){

// }

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
//   renderImg(selectedImg.src)
  onAddLine()
  renderMeme()
}

function onSetSelectedImg(selectedImg) {
  //   console.log("selectedImg", selectedImg.classList);

  var imgId = selectedImg.classList[0].substring(3);
  //   console.log('imgId',imgId )
  setSelectedImg(imgId);
}

function renderImg(selectedImg) {
  var img = new Image();
  img.src = selectedImg;
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height); //img,x,y,xend,yend
}

// function onSetLineTxt(e) {
//   setLineTxt(e.target.value);
//   renderMeme();
// }

function renderMeme() {
  // gCtx.clearRect(0, 0, canvas.width, canvas.height);
  // gCtx.fillRect(0, 0, canvas.width, canvas.height);
  const image = getImg();
  renderImg(image);
  renderLines();
}

function renderLines() {
  var meme = getMeme();

  //   var elStrokeClr = document.querySelector(".stroke-color");
console.log('',meme)
  meme.lines.forEach((line) => {
      gCtx.beginPath();
      gCtx.lineWidth = 2;
      gCtx.font = `${line.size}px impact`;
      gCtx.textAlign = line.align;
      gCtx.strokeStyle = line.strokeColor;
      gCtx.fillStyle = line.fiilColor
      gCtx.strokeText(line.txt, line.x, line.y);
      gCtx.fillText(line.txt, line.x, line.y);        
      gCtx.strokeStyle = "red";
      var border = handelSelectedLine();
      gCtx.strokeRect(border.x, border.y, border.width, border.height);
      
  });
}

function onAddLine() {
  addLine();
  //put the place holder on the canvas
  renderMeme();
}

function onUpdateLine(e) {
  saveLineTxt(e.target.value);
  renderMeme();
//   clearMsg()
}


function onIncFont() {
//   var elTxtHeight = document.querySelector(".text");
//   elTxtHeight = elTxtHeight.clientHeight;
//   console.log("elTxtHeight", elTxtHeight);
  setMemeFontSize(+2);
//   var elTxtHeight = document.querySelector(".text");
//   elTxtHeight = elTxtHeight.clientHeight;
//   console.log("elTxtHeight", elTxtHeight);
  renderMeme();
}

function onDecFont() {
  setMemeFontSize(-2);
  renderMeme()
}

function setFontColor() {
  var elFontClr = document.querySelector(".font-color").value;
  setMemeColor(elFontClr)
}

function onSetAlign(value) {
  console.log("value", value);
  setMemeAlign(value);
  renderMeme();
}

function selectFont(value) {
  console.log("value", value);
}

function onSetDirection(value) {
    setDirection(value) 
    renderMeme()
}

function onSetNewLine() {
  addLine();
  console.log("", gMeme);
  console.log("", gMeme);
  // handelSelectedLine()
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