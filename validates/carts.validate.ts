import { Request,Response,NextFunction } from "express"
import productsModel from "../models/products.model";
export const valiAdd = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
   const quantity:number = parseInt(req.params.quantity);
   const product = await productsModel.findOne({_id:req.params.product_id});
   if(quantity>0&&product){
     next();

   }else{
        req["flash"]("error","Thêm vào giỏ hàng thất bại !!");    
        res.redirect("back");
        return;
   }
  
}
