import express,{Express, Request,Response} from 'express';
import usersModel from '../../models/user.model';
import otpModel from '../../models/otp.model';
import ordersModel from '../../models/orders.models';
import md5 from 'md5';
import { chatSocket } from '../../sockets/chat.socket';

export const index = async (req:Request,res:Response):Promise<void>=>{

    const orders = await ordersModel.find({
       status:{
        $ne:"cancel"
       },
        deleted:false,
        user_id:res.locals.userInfo.id
    });
    res.render("client/pages/profile/index",{orders:orders});
    chatSocket(res);
    
}
export const updateProfile = async (req:Request,res:Response):Promise<void>=>{
    try{
        const profileBody = {
            fullName:req.body.fullName,
            avatar:req.body.avatar
        }
        await usersModel.updateOne({
            _id:res.locals.userInfo._id
        },profileBody);
        req["flash"]("success","Cập nhật thành công");
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Cập nhật thất bại");
        res.redirect("back");
    }
    
    
    
}
export const changeEmail = async (req:Request,res:Response):Promise<void>=>{
    res.render("client/pages/profile/change-email")
    chatSocket(res);
    
}
export const changeEmailPatch = async (req:Request,res:Response):Promise<void>=>{
    const otp = await otpModel.findOne({email:res.locals.userInfo.email,otp:req.body.otp});
    if(!otp){
        req["flash"]("error","Cập nhật thất bại!!!");
        res.redirect("back");
    }else{
       await usersModel.updateOne({email:res.locals.userInfo.email},{
            email:req.body.email
        })
        await otpModel.deleteOne({otp:req.body.otp});
        req["flash"]("success","Cập nhật thành công !!!");
        res.redirect("/profile");
    }
}

export const changePassword = async (req:Request,res:Response):Promise<void>=>{
    res.render("client/pages/profile/change-password")
    chatSocket(res);
    
}
export const changePasswordPatch = async (req:Request,res:Response):Promise<void>=>{
    const {password,passwordNew} = req.body;
    const idUser = res.locals.userInfo._id;
    const user = await usersModel.findOne({_id:idUser}).select("password");
    if(md5(password)!==user.password){
        req["flash"]("error","Cập nhật thất bại !!!");
        res.redirect("back");
        return;
    }
    
    await usersModel.updateOne({_id:idUser},{password:md5(passwordNew)});
    req["flash"]("success","Cập nhật thành công !!!");
    res.redirect("back");
    
}