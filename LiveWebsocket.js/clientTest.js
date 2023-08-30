const { io } = require("socket.io-client")

const socket = io("ws://104.154.225.164:3000");

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