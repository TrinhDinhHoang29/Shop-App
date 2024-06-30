import { Request,Response,NextFunction } from "express"

export const loginValid = (req:Request,res:Response,next:NextFunction):void=>{
    const {email,password} = req.body;
    if(!email.trim()||!password.trim()){
        req["flash"]("error","Đăng nhập thất bại");
        res.redirect("back");
        return;
    }
    next();
}
