import express,{Express, Request,Response} from 'express';

import usersModel from '../../models/user.model';
import roomChatModel from '../../models/roomChat.model';
import { roomChatsFillter } from '../../helpers/roomChatFilter.helper';
import { chatSocket,connectSocketAdmin } from '../../sockets/chat.socket';

export const index = async (req:Request,res:Response):Promise<void>=>{
    res.render("admin/pages/home/index",{});
}
export const messageNew = async (req:Request,res:Response):Promise<void>=>{
    try{
        const data = await roomChatsFillter();
        res.json({
            code:200,
            data:data
        })
    }catch(error){
        res.json({
            code:404,
            message:"error"
        })
    }
}