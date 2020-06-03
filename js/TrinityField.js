const uploadinput = document.getElementById("uploadinput");
const trinitybtn = document.getElementById("trinitybtn");
const canvas = document.getElementById("imagecanvas");

var ctx = canvas.getContext("2d");

var hasOverlay = false;

//initial bruhchiko
var img = new Image();
img.src = "img/bruhchiko.png"
img.onload = function() {
    var hRatio = canvas.width / img.width    ;
    var vRatio = canvas.height / img.height  ;
    var ratio  = Math.min ( hRatio, vRatio );
    ctx.drawImage(img, 0,0, img.width, img.height, 0,0,img.width*ratio, img.height*ratio);
  };

function addTrinityField(){
  addOverlay();
  var img = new Image();
  var to_rad = Math.PI/180;
  img.src= "img/trinityfieldbar.png"
  
  img.onload = function() {
    rotateAndPaintImage(ctx, img, Math.floor(Math.random() * 361)*to_rad, Math.floor(Math.random() * 400), Math.floor(Math.random() * 400), 19, 1250)
  }

  
}

function addOverlay(){
  if (hasOverlay === true) return;
  var img = new Image();
  img.src = "img/trinityfieldoverlay.png";
  img.onload = function(){
    ctx.drawImage(img, 0,0)
  }
  hasOverlay = true;
}

function changeImage(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hasOverlay = false;

  var reader = new FileReader();
  reader.onload = function(event){
      var img = new Image();
      img.onload = function(){
        var hRatio = canvas.width / img.width    ;
        var vRatio = canvas.height / img.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        ctx.drawImage(img, 0,0, img.width, img.height, 0,0,img.width*ratio, img.height*ratio);
      }
      img.src = event.target.result;
  }
  reader.readAsDataURL(uploadinput.files[0]);    
}

function rotateAndPaintImage ( context, image, angleInRad , positionX, positionY, axisX, axisY ) {
  context.translate( positionX, positionY );
  context.rotate( angleInRad );
  context.drawImage( image, -axisX, -axisY );
  context.rotate( -angleInRad );
  context.translate( -positionX, -positionY );
}
