
import express,{Express, Request,Response} from 'express';
import productsModel from '../../models/products.model';
import categorysModel from '../../models/product-categorys.model';
import conVertToSlug from '../../helpers/convertToSlug.helper';


// export const index = async (req:Request,res:Response):Promise<void>=>{
//     const keyword:string = req.query.keyword as string;
//     const songs = await songsModel.find({status:"active",deleted:false,slug:new RegExp(conVertToSlug(keyword))});
//     res.render("client/pages/searchs/index",{songs:songs});
// }


export const suggestFindProducts = async (req:Request,res:Response):Promise<void>=>{
    const keyWord:string = req.query.keyword as string;
    const categorys = await categorysModel.find({});
    const products = await productsModel.find({slug: new RegExp(conVertToSlug(keyWord))}).select("title slug productCategoryId thumbnail ").lean().limit(6);

    products.forEach(product=>{
        const categoryTitle = categorys.find(category=>category.id==product.productCategoryId);
        product.categoryTitle = categoryTitle.title;
    })
    res.json({
        code:200,
        data:products
     })

    
}