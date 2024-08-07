import express,{Express, Request,Response} from 'express';

import usersModel from '../../models/user.model';
import roomChatModel from '../../models/roomChat.model';
import chatModel from '../../models/chat.model';
import { roomChatsFillter } from '../../helpers/roomChatFilter.helper';
import { chatSocket,connectSocketAdmin } from '../../sockets/chat.socket';

export const index = async (req:Request,res:Response):Promise<void>=>{
    const roomChatId = req.params.room_id;
      const chats:any = await chatModel.find({room_chat_id:roomChatId,deleted:false});
      const users:any = await usersModel.find({deleted:false});
      chats.forEach(element=>{
        const user =  users.find(item=>item._id==element.user_id);
        if(user)
           element.fullName = user.fullName; 
      })
    res.render("admin/pages/chat/index",{chats:chats,roomChatId:roomChatId});
}
