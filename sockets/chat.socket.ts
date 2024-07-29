import { roomChatsFillter } from "../helpers/roomChatFilter.helper";
import chatModel from "../models/chat.model";
import roomChatModel from "../models/roomChat.model";

export const chatSocket = (res)=>{
    
    res["io"].once('connection', async (socket) => {
        if(res.locals.userInfo){
            const roomChat = await roomChatModel.findOne({user_id:res.locals.userInfo._id});
            console.log("client connect");
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
                 const roomChats = await roomChatsFillter();
                 res["io"].to(roomChat.id).emit("SEVER_RETURN_MESSAGE",objMSG);
                 res["io"].to(roomChat.id).emit("SEVER_RETURN_ANNOUNCEMENT",roomChats);

            })
        }
        
      });
}
export const connectSocketAdmin = (req,res,next)=>{
    res["io"].once('connection', async (socket) => {
        if(res.locals.account){ 
            console.log("server connect");
            const roomChats = await roomChatModel.find({status:"active"});
            for(const roomChat of roomChats){
                socket.join(roomChat.id)
            }
        }
    })
    next();
}