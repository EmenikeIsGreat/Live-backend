const { io } = require("socket.io-client")

const socket = io("ws://localhost:3000");

// Listen for the roomCount event before emitting the join-room event


socket.emit("join-room", "checkers")

socket.on("roomCount", message => {
    console.log(message)
})


let userName = "Emenike"
let venue = "Alctraz"
let userId = "d"
let replyingTo = "Emenike"
let profilePic = "Test"
let messageId = "mess"
let dateCreated = "yo"
let body = "Hello Emenike"

socket.emit("send-message",
    userName,
    venue,
    userId,
    replyingTo,
    profilePic,
    messageId,
    dateCreated,
    body
)

// socket.on("recieve-message",(
//     name,
//     userId,
//     replyingTo,
//     profilePic,
//     messageId,
//     dateCreated,
//     profilePic,
//     body
// )=>{

// })