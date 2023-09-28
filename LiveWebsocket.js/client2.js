const { io } = require("socket.io-client")

const socket = io("ws://34.70.174.42:3000");

// send a message to the server
// socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

socket.emit("join-room","Peforming Space Art Center")
// socket.emit("hello from client","hello","roomTalk");

// // receive a message from the server
socket.on("roomCount", (data) => {
  console.log(data)
});

socket.on("receive-message", (data) => {
  console.log(data)
});





