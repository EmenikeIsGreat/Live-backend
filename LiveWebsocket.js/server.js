const { Server } = require("socket.io")

const io = new Server(3000);


const socketRooms = new Map();


io.on("connection", (socket) => {

    socket.on('disconnect', function() {
        // emits the updated count to everyone when a user leaves
        if (socketRooms.has(socket.id)) {
            const rooms = socketRooms.get(socket.id);
            rooms.forEach((room) => {
                if(io.sockets.adapter.rooms.get(room)){
                    io.to(room).emit("roomCount",io.sockets.adapter.rooms.get(room).size);
                }
            });
            socketRooms.delete(socket.id);
        }
      });

    // joining the room and getting count of people inside
    socket.on("join-room",room=>{
        socket.join(room)
        // adds the rooms to their ids 
        if (!socketRooms.has(socket.id)) {
            socketRooms.set(socket.id, new Set());
        }
        socketRooms.get(socket.id).add(room);
        // make sure to use .io because its not an instance of user like socket
        io.in(room).emit("roomCount",io.sockets.adapter.rooms.get(room).size)
        console.log(socket.id + " joined " + room)
        console.log(room + " room size : ",io.sockets.adapter.rooms.get(room).size)
    })



    socket.on("send-message",(
        userName,
        venue,
        userId,
        replyingTo,
        profilePic,
        messageId,
        dateCreated,
        body
    )=>{

    // emit to everyone
    io.in(venue).emit("recieve-message",
        userName,
        userId,
        replyingTo,
        profilePic,
        messageId,
        dateCreated,
        body
    )
    
        
    
    })
});

