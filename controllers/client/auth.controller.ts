import express,{Express, Request,RequestHandler,Response} from 'express';
import usersModel from '../../models/user.model';
import otpModel from '../../models/otp.model';
import md5 from 'md5';
import roomChatModel from '../../models/roomChat.model';

export const login = async (req:Request,res:Response):Promise<void>=>{


    res.render("client/pages/auth/login");
    
}
export const loginPatch = async (req:Request,res:Response):Promise<void>=>{
    const user = await usersModel.findOne({deleted:false,email:req.body.email});
    if(!user){
        req["flash"]("error","Không tìm thấy tài khoản !!");
        res.redirect("back");
        return;
    }
    if(user.status === "inactive"){
        req["flash"]("error","Tài khoản đã bị khoá !!");
        res.redirect("back");
        return;
    }
    if(user.password == md5(req.body.password)){
        req["flash"]("success","Đăng nhập thành công !!");
        res.cookie("tokenUser",user.tokenUser,{expires: new Date(Date.now()+360*24*60*60*1000)});
        res.redirect("/");
    }else{
        req["flash"]("error","Sai mật khẩu!!");
        res.redirect("back");
    }
    
}
export const register = async (req:Request,res:Response):Promise<void>=>{

    res.render("client/pages/auth/register");
}
export const registerPost = async (req:Request,res:Response):Promise<void>=>{
    try{
        const userBody = {
            fullName:req.body.fullName,
            email:req.body.email,
            password:md5(req.body.password)
        }
        const user =  new usersModel(userBody);
        await user.save();
        const roomChat = new roomChatModel({
            user_id:user._id
        })
        await roomChat.save();
        req["flash"]("success","Tạo tài khoản thành công");
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Tạo tài khoản thất bại");
        res.redirect("back")
    }
    
    
} 
export const logOut = (req:Request,res:Response)=>{
    res.clearCookie("tokenUser");
    res.redirect("/login");
}
export const forgotPassowrd = (req:Request,res:Response)=>{
    res.render("client/pages/auth/forgot-password");
}
export const forgotPassowrdPatch = async (req:Request,res:Response):Promise<void>=>{
    const isOTP = await otpModel.findOne({
        otp:req.body.otp,
        email:req.body.email
    });
    if(isOTP){
        const user = await usersModel.findOne({email:req.body.email});
        res.cookie("tokenUser",user.tokenUser,{expires: new Date(Date.now()+360*24*60*60*1000)});
        await otpModel.deleteOne({otp:req.body.otp});
        res.redirect("/comfirm-password-new");
    }else{
        req["flash"]("error","Không thành công !!");
        res.redirect("back");
    }
}

export const comfirmPasswordNew = async (req:Request,res:Response):Promise<void>=>{
    res.render("client/pages/auth/comfirm-password-new")
}
export const comfirmPasswordNewPatch = async (req:Request,res:Response):Promise<void>=>{
    if(req.body.password===req.body.rePassword){
        try{
            await usersModel.updateOne({
                email:res.locals.userInfo.email
            },{
                password:md5(req.body.password)
            })
            res.redirect("/home");
        }catch(error){
            console.log(error);
            res.send("Server error !!");
        }
    }else{
        req["flash"]("error","Mật khẩu không khớp !!");
        res.redirect("back");
    }
    
    
}