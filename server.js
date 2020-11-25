console.log("node is running");

let express = require("express");
let socket = require("socket.io");
let app = express();
let port = process.env.PORT || 3000;
let server = app.listen(port);

app.use(express.static("public"));

let io = socket(server);

io.on("connection", newConnection);

function newConnection(socket){
  console.log("new connection: " + socket.client.id);

  let clientColor = getRandomColor();
  socket.emit("color", clientColor);

  let clientIndex = getRandomIndex();
  socket.emit("index", clientIndex);

  socket.on("mouse", mouseMessage);

  function mouseMessage(dataReceived){
    console.log(dataReceived);
    socket.broadcast.emit("mouseBroadcast", dataReceived);
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  //var color = "#";
  var greys = ['#303030', '#505050', '#696969', '#808080', '#989898', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#F5F5F5'];
  //for (var i=0; i<6; i++){
    //color += letters[Math.floor(Math.random() * 16)];
  //}
  var color = greys[Math.floor(Math.random() * 9)];
  return color;
}

function getRandomIndex(){
  var index = Math.floor(Math.random() * 6);
  console.log(index);
  return index;
}
