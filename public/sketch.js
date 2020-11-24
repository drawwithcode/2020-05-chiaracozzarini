let socket = io();
let myColor = "white";
let backgrounds = [];

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("index", setIndex);

function setColor(assignedColor){
  myColor = assignedColor;
}

function setIndex(assignedIndex){
  myIndex = assignedIndex;
}

function newConnection(){
  console.log("your id: " + socket.id);
}

function drawOtherMouse(data){
  push();
  noStroke();
  fill(255, 255, 255, 63);
  ellipse(data.x, data.y, 20);
  pop();
}

function preload(){
  // put preload code here
  img1 = loadImage('wallpaper1.jpg');
  backgrounds.push(img1);
  img2 = loadImage('wallpaper2.jpg');
  backgrounds.push(img2);
  img3 = loadImage('wallpaper3.jpg');
  backgrounds.push(img3);
  img4 = loadImage('wallpaper4.jpg');
  backgrounds.push(img4);
  img5 = loadImage('wallpaper5.jpg');
  backgrounds.push(img5);
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  // put setup code here
  background(backgrounds[myIndex]);
  console.log(myIndex);
  textSize(25);
  textAlign(CENTER, CENTER);
  text('you r not alone', windowWidth/2, windowHeight/2);
  textSize(20);
  text('draw on the misted glass to send messages to others', windowWidth/2, windowHeight/2+40);

}

function draw() {
  // put drawing code here
}

function mouseMoved(){
  push();
  noStroke();
  fill(myColor);
  tint(255, 126);
  ellipse(mouseX, mouseY, 20);
  pop();
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
  };
  socket.emit("mouse", message);
}
