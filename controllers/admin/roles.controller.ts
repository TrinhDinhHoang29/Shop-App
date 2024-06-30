import express,{Express, Request,RequestHandler,Response} from 'express';
import rolesModel from '../../models/roles.model';
import accountsModel from '../../models/account.model';
import paginationHelper from '../../helpers/pagination';
import * as isValid from '../../validates/isValids.validates';
import md5 from 'md5';
import roles from '../../models/roles.model';
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
    const countrole = await rolesModel.find(filter).countDocuments();
    objPagination.totalPage = Math.ceil(countrole/objPagination.limiteItem);
    const resultPagination = paginationHelper(objPagination,req.query);

    // pagination end ---------------------------------------

    const roles = await rolesModel.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).sort(sort).lean();
    
    const accounts = await accountsModel.find({});
    for(const role of roles){
        const account = accounts.find(item=>item.id == role.createdBy["id"]);
        role["fullNameCreater"] = account.fullName;
    }
    res.render("admin/pages/roles/index",{roles:roles,objPagination:resultPagination});
}
export const detail = async (req:Request,res:Response):Promise<void>=>{
    const idRole:string = req.params.id;
    const role = await rolesModel.findOne({_id:idRole});
    res.render("admin/pages/roles/detail",{role:role});
}
export const create = async (req:Request,res:Response):Promise<void>=>{
    
    res.render("admin/pages/roles/create");
}
export const createPost = async (req:Request,res:Response):Promise<void>=>{
    
    try{
        const roleBody = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            createdBy:{id:res.locals.account._id}
        }
        const role = new rolesModel(roleBody);
        await role.save();
        req["flash"]("success","Thêm thành công !!!");
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Thêm thất bại !!!");
        res.redirect("back");
    }
    
}


export const actionUpdate:RequestHandler<{id:string,actionUpdate:string,status:string}> = async(req:Request,res:Response):Promise<void>=>{
    const idRole = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate:(string|boolean) = req.params.status;
    console.log(idRole,actionUpdate,valueUpdate)
    if(req.params.status=="true")
        valueUpdate=true;

    try{
        await rolesModel.updateOne({
            _id:idRole
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
                await rolesModel.updateMany({
                    _id:value
                },{
                    status:"active"
                });
                break;
            case "inactive":
                await rolesModel.updateMany({
                    _id:value
                },{
                    status:"inactive"
                })
                break;
            case "delete-all":
                await rolesModel.updateMany({
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


export const edit = async (req:Request,res:Response):Promise<void>=>{
    try{
        const idRole = req.params.id;
        const roleEdit = await rolesModel.findOne({_id:idRole});
        const account = await accountsModel.find({_id:roleEdit.createdBy["id"]});
        roleEdit["fullNameCreater"] = account["fullName"];
        
    
    res.render("admin/pages/roles/edit",{roleEdit:roleEdit})
    }catch(error){
        res.redirect("back");
    }
    

}
export const editPatch = async(req:Request,res:Response):Promise<void>=>{
    const roleId = req.params.id;
    const roleBody = {
        title:req.body.title,
        description:req.body.description,
        status:req.body.status,
    }
    try{
        await rolesModel.updateOne({
            _id:roleId
        },roleBody);
        req["flash"]("success","Cập nhật thành công!!!");
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Cập nhật thất bại!!!");
        res.redirect("back");
    }
}


export const permissions = async (req:Request,res:Response):Promise<void>=>{
    const roles = await rolesModel.find({status:"active" ,deleted:false});
    res.render("admin/pages/roles/permissions",{roles:roles});

}
export const permissionsPatch = async (req:Request,res:Response):Promise<void>=>{
    
    try{
        const bodyPermissions:[{
            id:string,
            permissions:[]
        }] = req.body;
        for(const item of bodyPermissions){
            await roles.updateOne({
                _id:item.id
            },{
                permissions:item.permissions
            })
        }
        res.json({
            code:200,
            mess:"Update success!!"
        })
    }catch(error){
        res.json({
            code:404,
            mess:"Update error!!"
        })
    }
    

    

}