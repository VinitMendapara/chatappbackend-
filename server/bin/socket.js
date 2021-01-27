import { async } from 'regenerator-runtime'
import Message from "../models/message"


const socketHandler = async (io, socket) => {
    // user joins
    socket.on("register_me", msg => {
        console.log(`Client connected ${socket.id}`)
    })
    
    // user joins a chat room
    socket.on("register_room", room => {
      console.log(`Clients connected for room`)
      console.log(`joined room >${room}<`)
      socket.join(room)
    })

    // remove the user from room
    socket.on("remove_me", room => {
      console.log(`Removing user from room`)
      console.log(room)
      socket.leave(room)
    })

    // on message receive, save it to database and then send
    socket.on("typing", async ({ username, room }) => {
        io.to(room).emit("user_type_msg", username)
    })

    // on message receive, save it to database and then send
    socket.on("send", async ({chat_text, my_user_id, current_chat_user, room}) => {
        console.log(`sending ${chat_text} to >${room}<`)
        const insert_to_db = await Message.create({message: chat_text, from_user: my_user_id, to_user: current_chat_user})
        delete insert_to_db["_id"]
        delete insert_to_db["__v"]
        io.to(room).emit("chat_message", insert_to_db)
    })

    // user disconnects
    socket.on("disconnect", () => {
        console.log("Client disconnected")
    })
}

export default socketHandler