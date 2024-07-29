import roomChatModel from '../models/roomChat.model';
import usertModel from '../models/user.model';
import chatModel from '../models/chat.model';
import { calculateTimeDifference } from './calculateTimeDifference.helper';
const sortNewChats = (roomChats) => {
    const sortedChats = roomChats.sort((a, b) => {
        const dateA:any = new Date(a.messageEnd.createdAt);
        const dateB:any = new Date(b.messageEnd.createdAt);
        return dateB - dateA; // Sắp xếp giảm dần, nếu muốn tăng dần thì đổi thành dateA - dateB
    });
    return sortedChats.slice(0, 6);

};
export const roomChatsFillter = async()=>{
    const roomChats:any = await roomChatModel.find({deleted:"false"}).lean();
    const users = await usertModel.find({}).select("-tokenUser -password ");
    for(const roomChat of roomChats){
        roomChat.user = users.find(user=>user.id == roomChat.user_id); 
        const messageEnd:any = await chatModel.find({room_chat_id:roomChat._id}).sort({createdAt:"desc"}).limit(1);
        if(messageEnd.length>0){
            messageEnd[0].timeDifference = calculateTimeDifference(messageEnd[0].createdAt);
            roomChat.messageEnd = messageEnd[0];
        }
    }
    const roomChatsFillter = roomChats.filter((roomChat)=>roomChat.messageEnd);
    return sortNewChats(roomChatsFillter);
}