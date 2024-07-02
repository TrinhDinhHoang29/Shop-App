import express,{Express, Request,Response} from 'express';
import categorysModel from '../../models/product-categorys.model';
import productsModel from '../../models/products.model';
export const detail = async (req:Request,res:Response):Promise<void>=>{
    try{
        const slug = req.params.slug;
        const product = await productsModel.findOne({slug:slug,status:"active",deleted:false});
        const products = await productsModel.find({slug:{$ne:slug},productCategoryId:product.productCategoryId,status:"active",deleted:false}).limit(4);
        res.render("client/pages/products/detail",{product,products});
    }catch(error){
        res.status(404).send("Page error"+error);
    }
    
}