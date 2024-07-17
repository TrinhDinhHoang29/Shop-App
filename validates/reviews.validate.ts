import { Request,Response,NextFunction } from "express"
import productsModel from "../models/products.model";
import ordersModel from "../models/orders.models";
export const valiAdd = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const existsOrder:any = await ordersModel.findOne({
        _id: req.params.order_id,
        'products.product_id':req.params.product_id 
    }) 
    if(!existsOrder){
        req["flash"]("error","Đánh giá sản phẩm thất bại !!");
        res.redirect("back");
        return;
    }
    const product = existsOrder.products.find(item=>item.product_id==req.params.product_id);
    if(product.reviews_id){
        req["flash"]("error","Sản phẩm này đã được đánh giá !!");
        res.redirect("back");
        return;
    }

    next();
}