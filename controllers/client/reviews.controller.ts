import express,{Express, Request,Response} from 'express';
import categorysModel from '../../models/product-categorys.model';
import productsModel from '../../models/products.model';
import reviewsModel from '../../models/reviews.model';
import orders from '../../models/orders.models';
export const index = async (req:Request,res:Response):Promise<void>=>{
    const product = await productsModel.findOne({_id:req.params.product_id});
    
    res.render("client/pages/reviews/index",{order_id:req.params.order_id,product:product});
}
export const indexPost = async (req:Request,res:Response):Promise<void>=>{
    try{
        const review = new reviewsModel({
            product_id:req.params.product_id,
            user_id:res.locals.userInfo._id,
            rating:req.body.rating,
            comment:req.body.comment,
            images:req.body.images
        })     
        await review.save();
        await orders.updateOne({
            _id: req.params.order_id,
            'products.product_id':req.params.product_id 

        },{
            $set: { 'products.$.reviews_id': review.id } 
        })
        req["flash"]("success","Đánh giá sản phẩm thành công !!");
        res.redirect(`/orders/${req.params.order_id}`);
    }catch(error){
        req["flash"]("error","Đánh giá sản phẩm thất bại !!");
        res.redirect("back");
    }
}