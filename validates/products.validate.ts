import { Request,Response,NextFunction } from "express"



export const valiCreate = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {type,title,description,price,discountPercentage,stock,status,thumbnail,productCategoryId} = req.body;
  
    if(!type||!productCategoryId.trim()||!title.trim()||!description.trim()||!status.trim()||!thumbnail.trim()||parseInt(price)<0||parseFloat(discountPercentage)<0||parseInt(stock)<0){
        req["flash"]("error","Thêm thất bại!!!");
        res.redirect("back");
        return;
    }
    next();

}
export const valiEdit = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {type,title,description,price,discountPercentage,stock,status,productCategoryId} = req.body;
  
    if(!type||!productCategoryId.trim()||!title.trim()||!description.trim()||!status.trim()||parseInt(price)<0||parseFloat(discountPercentage)<0||parseInt(stock)<0){
        req["flash"]("error","Sửa hất bại!!!");
        res.redirect("back");
        return;
    }
    next();

}