var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//When clicking on control list items
$(".controls").on("click", "li", function(){
   //Deselect sibling elements        
  $(this).siblings().removeClass("selected");
  //Select clicked elements 
  $(this).addClass("selected");
  //cache the color
  color = $(this).css("background-color");
});

//When new color is pressed 
$("#revealColorSelect").click(function(){
  //show color select or hide color select
  changeColor();
  $("#colorSelect").toggle();
});


//update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g +", " + b + ")");
}

//when color sliders change
$("input[type=range]").on("input", changeColor);

//when add color is pressed 
$("#addNewColor").click(function(){
  //append the color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //select new color
  $newColor.click();
});



//On mouth events on the canvas
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  //Draw lines
  if(mouseDown) {
  context.beginPath();
  context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
  context.lineTo(e.offsetX, e.offsetY);
  context.strokeStyle = color;
  context.stroke(); 
  lastEvent = e;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
             
$canvas.mouseup();             
             
});
