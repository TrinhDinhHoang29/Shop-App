import accountModel from '../models/account.model';
import roleModel from '../models/roles.model';
import usertModel from '../models/user.model';
import { Request,Response,NextFunction } from 'express';
 
// const roleModel = require("../../models/roles.model");
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
    next();
}
export const existsTokenUser = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    if(req.cookies.tokenUser){
        const user = await usertModel.findOne({deleted:false,status:"active",tokenUser:req.cookies.tokenUser}).select("-password");
        if(user){
            // const favorites = await favoriteModel.find({userId:user.id});
            // res.locals.favoritesLocal = favorites;
            res.locals.userInfo = user;
        }
            
    }

    next();
}
export const existsUserInfo = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    if(res.locals.userInfo){
        next();
    }else{
        res.redirect("/login");
    }
}