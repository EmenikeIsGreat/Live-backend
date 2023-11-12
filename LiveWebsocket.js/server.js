const { Server } = require("socket.io")

const io = new Server(3000);


const socketRooms = new Map();
const users = new Map()


io.on("connection", (socket) => {

    socket.on('disconnect', function() {
        console.log(socket.id + " has disconnected")
        // emits the updated count to everyone when a user leaves
        if (socketRooms.has(socket.id)) {
            const rooms = socketRooms.get(socket.id);
            rooms.forEach((room) => {
                if(io.sockets.adapter.rooms.get(room)){
                    console.log(io.sockets.adapter.rooms.get(room).size)
                    io.to(room).emit("roomCount",io.sockets.adapter.rooms.get(room).size);
                }
            });
            socketRooms.delete(socket.id);
        }
      });

    socket.on('register', (username) => {
        users.set(username, socket.id);
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
        username,
        venue,
        userId,
        replyingTo,
        profilePic,
        messageId,
        dateCreated,
        body,
        broadcast,
        userAnonymous
    )=>{
        console.log(
            username,
            venue,
            userId,
            replyingTo,
            profilePic,
            messageId,
            dateCreated,
            body,
            broadcast,
            userAnonymous
        )

        // emit to everyone
        io.in(venue).emit("receive-message",
            username,
            userId,
            replyingTo,
            profilePic,
            messageId,
            dateCreated,
            body,
            broadcast,
            userAnonymous
        )
    })

    socket.on("deleteMessage",(room,messageId)=>{
        io.in(room).emit("deleteMessage",messageId)
    })

    socket.on("send-dm", (
        username,
        userId,
        replyingTo,
        profilePic,
        messageId,
        dateCreated,
        body,
        userAnonymous
    ) => {
        io.to(users.get(username)).emit("receive-dm", 
            username,
            userId,
            replyingTo,
            profilePic,
            messageId,
            dateCreated,
            body,
            userAnonymous);
    });
});

