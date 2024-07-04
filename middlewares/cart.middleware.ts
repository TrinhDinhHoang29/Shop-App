import cartsModel from "../models/carts.model";
import { Request,Response,NextFunction } from "express";

export const cartsMiddleware = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    if(!req.cookies.cartId){
        const cart = new cartsModel();
        await cart.save();    
        res.cookie("cartId",cart.id,{expires: new Date(Date.now()+360*24*60*60*1000)});
        res.locals.cart = cart;
    }
    else{
        const cart:any = await cartsModel.findOne({_id:req.cookies.cartId});
        
        cart.totalQuantity = cart.products.reduce((total,current)=>total+current.quantity,0);
        res.locals.cart = cart;
    }
    next();
}