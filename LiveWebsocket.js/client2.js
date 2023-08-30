const { io } = require("socket.io-client")

const socket = io("ws://104.154.225.164:3000");

// send a message to the server
// socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

socket.emit("join-room","Alcatraz")
// socket.emit("hello from client","hello","roomTalk");

// // receive a message from the server
socket.on("roomCount", (data) => {
  console.log(data)
});

socket.on("recieve-message", (data) => {
  console.log(data)
});





