import express,{Express, Request,Response} from 'express';
import categorysModel from '../../models/product-categorys.model';
import productsModel from '../../models/products.model';
import reviewsModel from '../../models/reviews.model';
import usersModel from '../../models/user.model';
import { chatSocket } from '../../sockets/chat.socket';

export const detail = async (req:Request,res:Response):Promise<void>=>{
    try{
        const slug = req.params.slug;
        const product = await productsModel.findOne({slug:slug,status:"active",deleted:false});
        const products = await productsModel.find({slug:{$ne:slug},productCategoryId:product.productCategoryId,status:"active",deleted:false}).limit(4);
        const reviews:any = await reviewsModel.find({product_id:product._id}).select("-password -tokenUser ").lean();
        const users = await usersModel.find({});
        reviews.forEach(review=>{
            const user = users.find(item=>item.id==review.user_id);
            review.user = user;
            const date = new Date(review.createdAt);
            review.date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        })
        res.render("client/pages/products/detail",{product,products,reviews:reviews});
        chatSocket(res);
    }catch(error){
        res.status(404).send("Page error"+error);
    }
    
}
export const listProducts = async (req:Request,res:Response):Promise<void>=>{
    try{
       const priceStart = req.params.priceStart;
       const priceEnd = req.params.priceEnd;
       const products = await productsModel.find({
            status:"active",
            deleted:false,
            price: {
                $gte: priceStart,
                $lte: priceEnd
            }
       })
       res.json({
        code:200,
        products:products
       })
    }catch(error){
        res.json({
            code:404,
            error:error
           })
    }
    
}