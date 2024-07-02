import express,{Express, Request,Response} from 'express';
import categorysModel from '../../models/product-categorys.model';
import productsModel from '../../models/products.model';
import { isValidLimiteItem } from '../../validates/isValids.validates';
import paginationHelper from '../../helpers/pagination';
export const index = async (req:Request,res:Response):Promise<void>=>{
    try{
        
        const slugCategory:string = req.params.slug;
        const category = await categorysModel.findOne({slug:slugCategory,status:"active",deleted:false});
        const filter = {
            status:"active",
            deleted:false,
            productCategoryId:category.id
        }
        // pagination start -----------------------------------
        let objPagination:any = {
            limiteItem:9,
            currentPage:1,   
        }
        const countProduct = await productsModel.find(filter).countDocuments();
        objPagination.totalPage = Math.ceil(countProduct/objPagination.limiteItem);
        const resultPagination = paginationHelper(objPagination,req.query);

        // pagination end ---------------------------------------
        const products = await productsModel.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem)

        res.render("client/pages/categorys/index",{category,products,objPagination:resultPagination});
    }catch(error){
        res.status(404).send("Page error"+error);
    }
    
}