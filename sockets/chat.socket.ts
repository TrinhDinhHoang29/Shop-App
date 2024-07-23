import chatModel from "../models/chat.model";
import roomChatModel from "../models/roomChat.model";
export const chatSocket = (res)=>{

    global._io.once('connection', async (socket) => {
        const roomChat = await roomChatModel.findOne({user_id:res.locals.userInfo._id});
        socket.join(roomChat.id);
        socket.on('CLIENT_SEND_MESSAGE',async (data)=> {
            const objMSG:any = {
                user_id:res.locals.userInfo._id,
                room_chat_id:roomChat.id,
                content:data.content,
                images:[]
             };
             const chat = new chatModel(objMSG);
             await chat.save();
             const  date = new Date(chat.createdAt);
             objMSG.date = `${date.getHours()}:${date.getMinutes()}`;
             global._io.to(roomChat.id).emit("SEVER_RETURN_MESSAGE",objMSG);
        })

      });
}