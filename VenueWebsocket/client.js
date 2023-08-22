const { io } = require("socket.io-client")

const socket = io("ws://localhost:3000");

// send a message to the server
// socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// socket.emit("join-room","roomTalk")
socket.emit("hello from client","can you hear me","roomTalk");

// receive a message from the server
socket.on("hello from client", (...args) => {
  console.log(args)
});

socket.on("connection",message =>{
  console.log(message)
})



