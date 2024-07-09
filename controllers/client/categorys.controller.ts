import express,{Express, Request,Response} from 'express';
import categorysModel from '../../models/product-categorys.model';
import productsModel from '../../models/products.model';
import { isValidLimiteItem } from '../../validates/isValids.validates';
import paginationHelper from '../../helpers/pagination';
export const index = async (req:Request,res:Response):Promise<void>=>{
    try{
        
        const slugCategory:string = req.params.slug;
        const priceStart = req.query.priceStart;
        const priceEnd = req.query.priceEnd;
        
        let category:any = [];
        let filter:any = {
            status:"active",
            deleted:false,
        };
     
        if(slugCategory!="all"){
             category = await categorysModel.findOne({slug:slugCategory,status:"active",deleted:false});
              filter = {
                status:"active",
                deleted:false,
                productCategoryId:category.id
            }
        }
       
        if(priceEnd&&priceStart)
            {
                filter.price= {
                    $gte: priceStart,
                    $lte: priceEnd
                }
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