import express,{Express, NextFunction, Request,Response} from 'express';
import ordersModel from '../../models/orders.models';
import productsModel from '../../models/products.model';


export const detail = async (req:Request,res:Response):Promise<void>=>{

    try{
        const orderId = req.params.id;
        const order:any = await ordersModel.findOne({_id:orderId}).lean();
        const productIds = order.products.map(item=>item.product_id);
        const products = await productsModel.find({
            _id:{
                $in:productIds
            }
        }).select("title thumbnail");
        
        for(const product of order.products){
            const record = products.find(item=>item._id==product.product_id);
            product.title = record.title;
            product.thumbnail = record.thumbnail;
        }
        res.render("client/pages/orders/detail",{order:order});
    }catch(error){
        console.log("erro:"+error);
        res.send("Server error "+error);
    }
   
}

export const deleted = async (req:Request,res:Response):Promise<void>=>{
    try{
        const orderId = req.params.id;
        const order = await ordersModel.findOne({
            _id:orderId
        })
        if(order.status === "ordered"){
            await ordersModel.updateOne({
                _id:orderId
            },{
                status:"cancel"
            })
            req["flash"]("success","Hủy đơn hàng thành công !!");
            res.redirect("back")
        }else{
            req["flash"]("error","Hủy đơn hàng không thành công !!");
            res.redirect("back")
        }
    }catch(erro){
       
        res.status(404).send("Server error !!")
    }




}