import express,{Express, Request,Response} from 'express';
import categorysModel from '../../models/product-categorys.model';
import productsModel from '../../models/products.model';
import { chatSocket } from '../../sockets/chat.socket';

export const index = async (req:Request,res:Response):Promise<void>=>{
    const categorys = await categorysModel.
                                            find({status:"active",deleted:false}).
                                            limit(5).
                                            sort({posision:"asc"});
    const arrCategoryId = categorys.map(item=>item._id);              
    const products = await productsModel.find({
        productCategoryId:{
            $in:arrCategoryId
        },
        status:"active",
        deleted:false
    }).sort({
        createdAt:"desc"
    }).limit(12).lean();
    for(const product of products){
        const category = categorys.find(item=>item._id==product.productCategoryId);
        product.slugCategory = category.slug;
    }
    const productSellers = await productsModel.find({status:"active",deleted:false,type:"seller"}).limit(3).sort({posision:"asc"});
    const productTrends= await productsModel.find({status:"active",deleted:false,type:"trend"}).limit(3).sort({posision:"asc"});
    const productFeatures = await productsModel.find({status:"active",deleted:false,type:"feature"}).limit(3).sort({posision:"asc"});

    
    res.render("client/pages/home/index",{
        categorys,
        products,
        productSellers,
        productTrends,
        productFeatures
    });
    chatSocket(res);
}