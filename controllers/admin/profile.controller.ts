import express,{Express, Request,Response} from 'express';
import accountModel from '../../models/account.model';
import otpModel from '../../models/otp.model';
import md5 from 'md5';
export const index = async (req:Request,res:Response):Promise<void>=>{
    
    res.render("admin/pages/profile/index");
}
export const indexPatch = async (req:Request,res:Response):Promise<void>=>{
    const profileBody = {
        fullName:req.body.fullName,
        avatar:req.body.avatar
    };
    try {
        await accountModel.updateOne({_id:res.locals.account.id},profileBody);
        req["flash"]("success","Cập nhật thành công !!!");
        res.redirect("back");
    } catch (error) {
        req["flash"]("error","Cập nhật thất bại !!!");
        res.redirect("back");
    }
}
export const changePassword = async (req:Request,res:Response):Promise<void>=>{
    
    res.render("admin/pages/profile/change-password");
}
export const changePasswordPatch = async (req:Request,res:Response):Promise<void>=>{
    const {password,passwordNew} = req.body;
    const idAccount = res.locals.account.id;
    const account = await accountModel.findOne({_id:idAccount}).select("password");
    if(md5(password)!==account.password){
        req["flash"]("error","Cập nhật thất bại !!!");
        res.redirect("back");
        return;
    }
    
    await accountModel.updateOne({_id:idAccount},{password:md5(passwordNew)});
    req["flash"]("success","Cập nhật thành công !!!");
    res.redirect("back");
    
}
export const changeEmail = async (req:Request,res:Response):Promise<void>=>{
    
    res.render("admin/pages/profile/change-email");
}
export const changeEmailPatch = async (req:Request,res:Response):Promise<void>=>{
    const otp = await otpModel.findOne({email:res.locals.account.email,otp:req.body.otp});
    if(!otp){
        req["flash"]("error","Cập nhật thất bại!!!");
        res.redirect("back");
    }else{
       await accountModel.updateOne({email:res.locals.account.email},{
            email:req.body.email
        })
        await otpModel.deleteOne({otp:req.body.otp});
        req["flash"]("success","Cập nhật thành công !!!");
        res.redirect("/admin/profile");
    }
}