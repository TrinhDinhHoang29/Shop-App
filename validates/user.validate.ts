import { Request,Response,NextFunction } from "express"
import usersModel from '../models/user.model';


const isEmail = async (email:string):Promise<boolean>=>{
    const existsEmail = await usersModel.findOne({email:email});
    if(existsEmail)
        return true;
    return false;

}
export const valiCreate = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {fullName,email,password,rePassword} = req.body;
    const existsEmail:boolean = await isEmail(email);
    if(!fullName.trim()||!email.trim()||!password.trim()||!rePassword.trim()||existsEmail){
        req["flash"]("error","Tạo tài khoản thất bại!!!");
        res.redirect("back");
        return;
    }
    if(password!==rePassword){
        req["flash"]("error","Tạo tài khoản thất bại!!!");
        res.redirect("back");
        return;
    }
    next();
}
export const valiLogin = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {email,password} = req.body;
    if(!email.trim()||!password.trim()){
        req["flash"]("error","Không để trống thông tin !!!");
        res.redirect("back");
        return;
    }
    
    next();
}
export const valiEdit = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {fullName} = req.body;
    if(!fullName.trim()){
        req["flash"]("error","Tạo tài khoản thất bại!!!");
        res.redirect("back");
        return;
    }
    next();
}
export const changeEmailValid = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {email,otp} = req.body;
    let existsEmail:boolean = await isEmail(email);
    if(!email.trim()||!otp.trim()||existsEmail){
        req["flash"]("error","Cập nhật thất bại !!!");
        res.redirect("back");
        return;
    }
    
    next();
}

export const changePasswordValid = (req:Request,res:Response,next:NextFunction):void=>{
    const {password,passwordNew,rePasswordNew} = req.body;
    if(!password.trim()||!passwordNew.trim()||!rePasswordNew.trim()){
        req["flash"]("error","Cập nhật thất bại !!!");
        res.redirect("back");
        return;
    }
    if(passwordNew!==rePasswordNew){
        req["flash"]("error","Cập nhật thất bại !!!");
        res.redirect("back");
        return;
    }
    next();
}