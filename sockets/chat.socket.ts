import { roomChatsFillter } from "../helpers/roomChatFilter.helper";
import chatModel from "../models/chat.model";
import roomChatModel from "../models/roomChat.model";
import { calculateTimeDifference } from "../helpers/calculateTimeDifference.helper";
import * as uploadCloud from '../helpers/uploadCloud.helper';
import reviewsModel from '../models/reviews.model';
import notificationsModel from "../models/notifications.model";
export const chatSocket = (res)=>{
    
    res["io"].once('connection', async (socket) => {
        if(res.locals.userInfo){
            const roomChat = await roomChatModel.findOne({user_id:res.locals.userInfo._id});
            console.log("client connect" + roomChat.id);
            socket.join(roomChat.id);
            socket.on('CLIENT_SEND_MESSAGE',async (data)=> {
                const images  = []; 
                for (const image of data.images) {
                    const link = await uploadCloud.upload(image);
                    images.push(link);
                }
                const objMSG:any = {
                    user_id:res.locals.userInfo._id,
                    room_chat_id:roomChat.id,
                    content:data.content,
                    type_send:"user",
                    images:images
                 };
                 const chat = new chatModel(objMSG);
                 await chat.save();
                 const  date = new Date(chat.createdAt);
                 objMSG.date = `${date.getHours()}:${date.getMinutes()}`;
                 const roomChats:any = await roomChatsFillter();
                roomChats.forEach(element => {
                    element.timeDifference =  calculateTimeDifference(element.messageEnd.createdAt);
                });
                 objMSG.fullName=res.locals.userInfo.fullName;
                 res["io"].to(roomChat.id).emit("SERVER_RETURN_MESSAGE",objMSG);
                 res["io"].to(roomChat.id).emit("SERVER_RETURN_ANNOUNCEMENT",roomChats);

            })

            // socket.on('CLIENT_SEND_NOTIFICATIONS',async(data)=>{
            //     let objNotification:any = {
            //         user_id:res.locals.userInfo._id,
                    
            //     };
            //     if(data.type=="reviews"){
            //         const reviews = await reviewsModel.find().sort({createdAt:"desc"}).limit(1);
            //         objNotification.type = "reviews";
            //         objNotification.type_id =reviews[0].id;

            //     }
            //     const notifications = new notificationsModel(objNotification);
            //     await notifications.save();
            //     console.log(notifications);

            // })
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
        socket.on("SERVER_SEND_MESSAGE", async (data)=>{
            const images  = []; 
           for (const image of data.images) {
              const link = await uploadCloud.upload(image);
              images.push(link);
           }
            const objMSG:any = {
                user_id:res.locals.account._id,
                room_chat_id:req.params.room_id,
                content:data.content,
                images:images,
                type_send:"admin"
           };
           const chat = new chatModel(objMSG);
           await chat.save();
           await chatModel.updateOne({_id:chat.id},{read:true});
        const  date = new Date(chat.createdAt);
        objMSG.date = `${date.getHours()}:${date.getMinutes()}`;
        objMSG.fullName = res.locals.account.fullName;
        res["io"].to(req.params.room_id).emit("SERVER_RETURN_MESSAGE",objMSG);
        })
    })
    
    next();
}