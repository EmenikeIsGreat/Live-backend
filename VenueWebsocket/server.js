const { Server } = require("socket.io")

const io = new Server(3000);

io.on("connection", (socket) => {
  // send a message to the client
  // receive a message from the client
  socket.emit("connection","YO")
  socket.on("hello from client", (message,room) => {
    console.log("received")
    var numClients = io.sockets.adapter.rooms.get(room);
    console.log(numClients)
    // adding a boradcast for this essentially makes it so that it emits to everyone but the one who sent it
    // io.emit("hello from server","WhatsPoppin")

    //.to already does th e broadcast as well
    socket.emit("hello from client","y00000")
    
    socket.to(room).emit("hello from client",message)
  });

  socket.on("join-room",room=>{
    // console.log(room)
    // console.log("rooms before: ",socket.rooms)
    socket.join(room)
    // console.log("joined Room")
    // console.log("rooms after: ",socket.rooms)
  })

  socket.on("deleteMessage",room=>{
    console.log('yoooooooooooooooo')
    // console.log("rooms before: ",socket.rooms)
    // console.log("joined Room")
    // console.log("rooms after: ",socket.rooms)
  })

});

