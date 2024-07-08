import { Request,Response,NextFunction } from "express"
import productsModel from "../models/products.model";



export const valiCheckStock = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
   const productIds = res.locals.cart.products.map(item=>item.product_id);
   const products = await productsModel.find({
    _id:{
        $in:productIds
    }
   }).select("stock");
   const check = products.filter(item=>{
        const product = res.locals.cart.products.find(productCart=>productCart.product_id==item.id);
        return product.quantity>item.stock
   });
   if(check.length>0){
    req["flash"]("error","Số lượng sản phẩm ở kho không đủ !!!");
    res.redirect("back");
   }else{
    next();
   }
}
export const valiAdd = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {firstName,lastName,tinh,quan,phuong,phone,email,orderNote} = req.body;
    if(!firstName.trim()||!lastName.trim()||!phone.trim()||!email.trim()||tinh==='0'||quan==='0'||phuong==='0'){
        req["flash"]("error","Vui lòng nhập đủ thông tin !!!");
         res.redirect("back");
    }else{
        next();
    }
}