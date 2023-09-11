const { io } = require("socket.io-client")

const socket = io("ws://localhost:3000");

// Listen for the roomCount event before emitting the join-room event


socket.emit("join-room", "Alcatraz",(res)=>{
    console.log(res)
})

socket.on("roomCount", message => {
    console.log(message)
})


let userName = "Emenike"
let venue = "Alcatraz"
let userId = "d"
let replyingTo = "Emenike"
let profilePic = "Test"
let messageId = "mess"
let dateCreated = "yo"
let body = "Hello Emenike"
let broadcast = true

socket.emit("send-message",
    userName,
    venue,
    userId,
    replyingTo,
    profilePic,
    messageId,
    dateCreated,
    body,
    broadcast
)

socket.on("recieve-message",(
    userName,
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