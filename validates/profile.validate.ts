import { Request,Response,NextFunction } from "express"
import accountModel from '../models/account.model';


const isEmail = async (email:string):Promise<boolean>=>{
    const existsEmail = await accountModel.findOne({email:email});
    if(existsEmail)
        return true;
    return false;

}

export const updateProfileValid = (req:Request,res:Response,next:NextFunction):void=>{
    const {fullName} = req.body;
    if(!fullName.trim()){
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