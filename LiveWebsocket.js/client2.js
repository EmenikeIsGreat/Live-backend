const { io } = require("socket.io-client")

// const socket = io("ws://34.70.174.42:3000");
const socket = io("http://localhost:3000");

// send a message to the server
// socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

socket.emit("join-room","Peforming Space Art Center")
socket.emit('register', 'Bob');

// socket.emit("hello from client","hello","roomTalk");

// // receive a message from the server
socket.on("roomCount", (data) => {
  console.log(data)
});

socket.on("receive-message", (data) => {
  console.log(data)
});

function sendDM(from, to, body, type) {
  socket.emit('send-dm', from, to, body, type);
  console.log("yooo")
}
sendDM("Emenike","Alice","YOOOOOO","YOOOOO")




