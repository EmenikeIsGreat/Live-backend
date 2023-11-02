const { io } = require("socket.io-client")

// const socket = io("ws://34.70.174.42:3000");
const socket = io("http://localhost:3000");

// Listen for the roomCount event before emitting the join-room event


socket.emit("join-room", "Alcatraz",(res)=>{
    console.log(res)
})

socket.emit('register', 'Alice');

socket.on("roomCount", message => {
    console.log(message)
})


let username = "Emenike"
let venue = "Alcatraz"
let userId = "d"
let replyingTo = "Emenike"
let profilePic = "Test"
let messageId = "mess"
let dateCreated = "yo"
let body = "Hello Emenike"
let broadcast = true

socket.emit("send-message",
    username,
    venue,
    userId,
    replyingTo,
    profilePic,
    messageId,
    dateCreated,
    body,
    broadcast
)

socket.on("receive-message",(
    username,
    userId,
    replyingTo,
    profilePic,
    messageId,
    dateCreated,
    body,
    broadcast
)=>{

    console.log(broadcast)

})

socket.emit("deleteMessage","Alcatraz","sample");

socket.on("deleteMessage",message=>{

    console.log(message)

})

socket.on("receive-dm", (from, body, type) => {
    console.log(`Received a ${type} DM from ${from}: ${body}`);
});


  