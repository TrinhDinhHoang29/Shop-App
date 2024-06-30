import { Request,Response,NextFunction } from "express"

export const valiCreate = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {title,status,description,thumbnail} = req.body;
    if(!title.trim()||!description.trim()||!status.trim()||!thumbnail){
        req["flash"]("error","Thêm thất bại!!!");
        res.redirect("back");
        return;
    }
    next();

}
export const valiEdit = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {title,status,description} = req.body;
    console.log(title,status,description);
    if(!title.trim()||!description.trim()||!status.trim()){
        req["flash"]("error","Cập nhật thất bại!!!");
        res.redirect("back");
        return;
    }
    next();

}