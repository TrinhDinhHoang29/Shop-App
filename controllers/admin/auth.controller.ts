import express,{Express, Request,Response} from 'express';
import accountModel from '../../models/account.model';
import md5 from 'md5';
export const login = async (req:Request,res:Response):Promise<void>=>{
    res.render("admin/pages/auth/login/index");
}
export const loginPost = async (req:Request,res:Response):Promise<void>=>{
    const account = await accountModel.findOne({deleted:false,email:req.body.email});
    if(!account){
        req["flash"]("error","Không tìm thấy tài khoản !!");
        res.redirect("back");
        return;
    }
    if(account.status === "inactive"){
        req["flash"]("error","Tài khoản đã bị khoá !!");
        res.redirect("back");
        return;
    }
    if(account.password == md5(req.body.password)){
        req["flash"]("success","Đăng nhập thành công !!");
        res.cookie("token",account.token,{expires: new Date(Date.now()+360*24*60*60*1000)});
        res.redirect("/admin/home");
    }else{
        req["flash"]("error","Sai mật khẩu!!");
        res.redirect("back");
    }
}
export const logOut = (req:Request,res:Response)=>{
    res.clearCookie("token");
    res.redirect("/admin/auth/login");
}