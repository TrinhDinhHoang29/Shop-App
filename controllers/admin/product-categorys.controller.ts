import express,{Express, Request,Response} from 'express';
import * as isValid from "../../validates/isValids.validates";
import paginationHelper from '../../helpers/pagination';
import categorysModel from '../../models/product-categorys.model';
import { treeCategorys } from '../../helpers/treeCategorys.helper';
import accountsModel from '../../models/account.model';
export const index = async (req:Request,res:Response):Promise<void>=>{
    type typeFilter={
        deleted:boolean,
        status?:string,
    }
    let sort:any = {
        title:"asc"
    }
    let filter:typeFilter = {
        deleted:false
    }
    if(req.query.typeFilter){
        filter.status = req.query.typeFilter as string;
    }
    if(isValid.isValidSort(req.query.sort)){
       sort.title = req.query.sort ;
    }
    // pagination start -----------------------------------
    let objPagination:any = {
        limiteItem:4,
        currentPage:1,   
    }
    if(isValid.isValidLimiteItem(req.query.limiteItem)){
        objPagination.limiteItem=req.query.limiteItem;
    }
    const countcategory = await categorysModel.find(filter).countDocuments();
    objPagination.totalPage = Math.ceil(countcategory/objPagination.limiteItem);
    const resultPagination = paginationHelper(objPagination,req.query);

    // pagination end ---------------------------------------

    const productCategorys:any = await categorysModel.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).sort(sort).lean();

    const accounts = await accountsModel.find({}).select("fullName");
    productCategorys.forEach(category=>{
        const infoCreated = accounts.find(item=>item.id==category.createdBy.id);
        category.fullNameCreated = infoCreated.fullName;
        const date = new Date(category.createdAt);
        category.fomatDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    })


    res.render("admin/pages/product-categorys/index",{productCategorys:productCategorys,objPagination:resultPagination});
}
export const create = async (req:Request,res:Response):Promise<void>=>{

    const categoryProducts = await categorysModel.find({status:"active",deleted:false});
    const records = treeCategorys(categoryProducts);
    res.render("admin/pages/product-categorys/create",{records:records});
}
export const createPost = async (req:Request,res:Response):Promise<void>=>{
    let posision = req.body.posision;
    const idParentCreate = res.locals.account._id;
    if(posision.trim()==''){
        posision = await categorysModel.countDocuments({deleted:false});
    }
    const categoryBody = {
        title:req.body.title,
        parentId:req.body.parentId,
        posision:parseInt(posision),
        description:req.body.description,
        status:req.body.status,
        thumbnail:req.body.thumbnail,
        createdBy:{
            id:idParentCreate
        }
    }
    try{
        const category = new categorysModel(categoryBody);
        await category.save();
        req["flash"]("success","Thêm thành công!!!");
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Thêm thất bại!!!");
        res.redirect("back");
    }

}
export const detail = async (req:Request,res:Response):Promise<void>=>{
    const idCategory = req.params.id;
    try{
        const category = await categorysModel.findOne({_id:idCategory});
        res.render("admin/pages/categorys/detail",{category:category})
    }catch(error){
        res.redirect("back");
    }
    
}
export const edit = async (req:Request,res:Response):Promise<void>=>{
    const idCategory = req.params.id;
    const categoryProducts = await categorysModel.find({status:"active",deleted:false});
    
    const records = treeCategorys(categoryProducts);
    try{
        const productCategory = await categorysModel.findOne({_id:idCategory});
        res.render("admin/pages/product-categorys/edit",{productCategory:productCategory,records:records})
    }catch(error){
        res.redirect("back");
    }

}
export const editPatch = async(req:Request,res:Response):Promise<void>=>{
    const idCategory = req.params.id; 
    const idParentCreate = res.locals.account._id;

    let posision:any = req.body.posision;
    if(!posision.trim()){
        posision = await categorysModel.countDocuments({deleted:false});
    }
    const categoryBody = {
        title:req.body.title,
        parentId:req.body.parentId,
        posision:parseInt(posision.trim()),
        description:req.body.description,
        status:req.body.status,
        thumbnail:req.body.thumbnail,
        createdBy:{
            id:idParentCreate
        }
    }
    try{
        await categorysModel.updateOne({
            _id:idCategory
        },categoryBody);
        req["flash"]("success","Cập nhật thành công!!!");
      
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Cập nhật thất bại!!!"+error);
        res.redirect("back");
    }
}


export const actionUpdate = async(req:Request,res:Response):Promise<void>=>{
    const idCategory = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate:(string|boolean) = req.params.status;

    if(req.params.status=="true")
        valueUpdate=true;

    try{
        await categorysModel.updateOne({
            _id:idCategory
        },{
            [actionUpdate]:valueUpdate
        })
        res.json({
            code:200,
            message:"Cập nhật thành công !!"
        })
    }catch(error){
        res.json({
            code:404,
            message:"Cập nhật thất bại !!"
        })
    }
}

export const changeMulti = async (req:Request,res:Response):Promise<void>=>{
    const type= req.body.type;
    const value = JSON.parse(req.body.value);

        switch(type){
            case "active":
                await categorysModel.updateMany({
                    _id:value
                },{
                    status:"active"
                });
                break;
            case "inactive":
                await categorysModel.updateMany({
                    _id:value
                },{
                    status:"inactive"
                })
                break;
            case "delete-all":
                await categorysModel.updateMany({
                    _id:value
                },{
                    deleted:true
                })
                break;
            default:
                req["flash"]("error","Cập nhật thất bại!!!");
                res.redirect("back");
                return;
            }
    req["flash"]("success","Cập nhật thành công!!!");
    res.redirect("back");
}