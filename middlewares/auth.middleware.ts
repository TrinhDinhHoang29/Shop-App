import accountModel from '../models/account.model';
import roleModel from '../models/roles.model';
import usertModel from '../models/user.model';
import { Request,Response,NextFunction } from 'express';
import categorysModel from '../models/product-categorys.model';
import { treeCategorys } from '../helpers/treeCategorys.helper';
import cartsModel from '../models/carts.model';
 
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
            res.locals.userInfo = user;
            const cart:any = await cartsModel.findOne({user_id:user.id});
            if(cart){
                res.cookie("cartId",cart.id,{expires: new Date(Date.now()+360*24*60*60*1000)});
                cart.totalQuantity = cart.products.reduce((total,current)=>total+current.quantity,0);  
                res.locals.cart = cart;
            }else{
                await cartsModel.updateOne({_id:res.locals.cart.id},{user_id:user.id});
            }
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