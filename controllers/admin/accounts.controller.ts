import express,{Express, Request,Response} from 'express';
import accountModel from '../../models/account.model';
import * as isValid from "../../validates/isValids.validates";
import paginationHelper from '../../helpers/pagination';
import roleModel from '../../models/roles.model';
import md5 from 'md5'
export const index = async (req:Request,res:Response):Promise<void>=>{
    type typeFilter={
        deleted:boolean,
        status?:string,
    }
    let sort:any = {
        fullName:"asc"
    }
    let filter:typeFilter = {
        deleted:false
    }
    if(req.query.typeFilter){
        filter.status = req.query.typeFilter as string;
    }
    if(isValid.isValidSort(req.query.sort)){
       sort.fullName = req.query.sort ;
    }
    // pagination start -----------------------------------
    let objPagination:any = {
        limiteItem:4,
        currentPage:1,   
    }
    if(isValid.isValidLimiteItem(req.query.limiteItem)){
        objPagination.limiteItem=req.query.limiteItem;
    }
    const countAccount = await accountModel.find(filter).countDocuments();
    objPagination.totalPage = Math.ceil(countAccount/objPagination.limiteItem);
    const resultPagination = paginationHelper(objPagination,req.query);

    // pagination end ---------------------------------------

    const accounts = await accountModel.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).sort(sort).lean()
    .select("-password -token");
    



    res.render("admin/pages/accounts/index",{accounts:accounts,objPagination:resultPagination});
}
export const create = async (req:Request,res:Response):Promise<void>=>{

    const roles = await roleModel.find({status:"active",deleted:false});
    res.render("admin/pages/accounts/create",{roles:roles});
}
export const createPost = async (req:Request,res:Response):Promise<void>=>{
    const accountBody = {
        fullName:req.body.fullName,
        email:req.body.email,
        password:md5(req.body.password),
        roleId:req.body.roleId,
        avatar:req.body.avatar,
        status:req.body.status,

    }
    try{
        const account = new accountModel(accountBody);
        await account.save();
        req["flash"]("success","Thêm thành công!!!");
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Thêm thất bại!!!");
        res.redirect("back");
    }
}
export const detail = async (req:Request,res:Response):Promise<void>=>{
    const idAccount = req.params.id;
    try{
        const account = await accountModel.findOne({_id:idAccount});
        res.render("admin/pages/accounts/detail",{account:account})
    }catch(error){
        res.redirect("back");
    }
    
}
export const edit = async (req:Request,res:Response):Promise<void>=>{
    const idAccount = req.params.id;
    const roles = await roleModel.find({status:"active",deleted:false});
    try{
        const account = await accountModel.findOne({_id:idAccount}).select("-password -token");
        res.render("admin/pages/accounts/edit",{account:account,roles:roles})
    }catch(error){
        res.redirect("back");
    }

}
export const editPatch = async(req:Request,res:Response):Promise<void>=>{
    const idAccount = req.params.id; 
    const accountBody = {
        fullName:req.body.fullName,
        email:req.body.email,
        roleId:req.body.roleId,
        avatar:req.body.avatar,
        status:req.body.status,

    }
    if(req.body.password){
        accountBody["password"] = md5(req.body.password);
    }
    try{
        await accountModel.updateOne({
            _id:idAccount
        },accountBody);
        req["flash"]("success","Cập nhật thành công!!!");
      
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Cập nhật thất bại!!!");
        res.redirect("back");
    }
}


export const actionUpdate = async(req:Request,res:Response):Promise<void>=>{
    const idAccount = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate:(string|boolean) = req.params.status;

    if(req.params.status=="true")
        valueUpdate=true;

    try{
        await accountModel.updateOne({
            _id:idAccount
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
                await accountModel.updateMany({
                    _id:value
                },{
                    status:"active"
                });
                break;
            case "inactive":
                await accountModel.updateMany({
                    _id:value
                },{
                    status:"inactive"
                })
                break;
            case "delete-all":
                await accountModel.updateMany({
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