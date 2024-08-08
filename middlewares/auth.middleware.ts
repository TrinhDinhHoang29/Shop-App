import accountModel from '../models/account.model';
import roleModel from '../models/roles.model';
import usertModel from '../models/user.model';
import { Request,Response,NextFunction } from 'express';
import categorysModel from '../models/product-categorys.model';
import { treeCategorys } from '../helpers/treeCategorys.helper';
import cartsModel from '../models/carts.model';
import ordersModel from '../models/orders.models';
import roomChatModel from '../models/roomChat.model';
import chatModel from '../models/chat.model';
import { convertDate } from '../helpers/convertDate.helper';
import { roomChatsFillter } from '../helpers/roomChatFilter.helper';
import { formatNotificationHelper } from '../helpers/formatNotifications.helper';



export  const checkToken = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    if(!req.cookies.token){
        res.redirect("/admin/auth/login");
        return;
    }
    const account = await accountModel.findOne({deleted:false,token:req.cookies.token}).select("-password");   
    if(!account){
        res.redirect("/admin/auth/login");
        return;
    }
    res.locals.account = account;
    res.locals.role = await roleModel.findOne({_id:account.roleId,deleted:false});
    res.locals.roomChats = await roomChatsFillter();
    res.locals.notifications = await formatNotificationHelper();
    next();
}
export const existsTokenUser = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    if(req.cookies.tokenUser){
        const user = await usertModel.findOne({deleted:false,status:"active",tokenUser:req.cookies.tokenUser}).select("-password");
        if(user){
            res.locals.userInfo = user;
            const cart:any = await cartsModel.findOne({user_id:user.id});
            if(cart){
                res.cookie("cartId",cart.id,{expires: new Date(Date.now()+360*24*60*60*1000)});
                cart.totalQuantity = cart.products.reduce((total,current)=>total+current.quantity,0);  
                res.locals.cart = cart;
            }else{
                await cartsModel.updateOne({_id:res.locals.cart.id},{user_id:user.id});
            }
            const roomChat = await roomChatModel.findOne({user_id:user.id});
            const chats = await chatModel.find({room_chat_id:roomChat.id}).lean();            
            res.locals.chats = convertDate(chats);
        }
            
    }
    const categorysHeader = await categorysModel.find({status:"active",deleted:false});
    const formatCategorysHeader = treeCategorys(categorysHeader);
    res.locals.categorysHeader = formatCategorysHeader;
    next();
}
export const existsUserInfo = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    if(res.locals.userInfo){
        next();
    }else{
        res.redirect("/login");
    }
}
export const existsOrder = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const orderId = req.params.id;
    const order = await ordersModel.findOne({_id:orderId,user_id:res.locals.userInfo.id})
    if(order)
        next();
    else
        res.redirect("back");
}