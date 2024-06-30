import express,{Express, Request,Response} from 'express';

import usersModel from '../../models/user.model';
import paginationHelper from '../../helpers/pagination';
import * as validateTopic from '../../validates/topic.validate';
import * as isValid from '../../validates/isValids.validates';
import categorysModel from '../../models/product-categorys.model';


export const users  = async (req:Request,res:Response):Promise<void>=>{
   try {
    const users:any = await usersModel.find({status:"active",deleted:false}).select("-tokenUser -password").lean()
    for(const user of users){
        const dateTime = new Date(user.createdAt);
        users.dateTime = `${dateTime.getDay()}/${dateTime.getMonth()}/${dateTime.getFullYear()}`;
    }
    res.json({
        code:200,
        users:users
    })    
   } catch (error) {
    res.json({
        code:404
    })
   }
}
// export const index = async (req:Request,res:Response):Promise<void>=>{
//     type typeFilter={
//         deleted:boolean,
//         status?:string,
//     }
//     let sort:any = {
//         title:"asc"
//     }
//     let filter:typeFilter = {
//         deleted:false
//     }
//     if(req.query.typeFilter){
//         filter.status = req.query.typeFilter as string;
//     }
//     if(isValid.isValidSort(req.query.sort)){
//        sort.title = req.query.sort ;
//     }
//     // pagination start -----------------------------------
//     let objPagination:any = {
//         limiteItem:4,
//         currentPage:1,   
//     }
//     if(isValid.isValidLimiteItem(req.query.limiteItem)){
//         objPagination.limiteItem=req.query.limiteItem;
//     }
//     const countTopic = await topicsModel.find(filter).countDocuments();
//     objPagination.totalPage = Math.ceil(countTopic/objPagination.limiteItem);
//     const resultPagination = paginationHelper(objPagination,req.query);

//     // pagination end ---------------------------------------
//     const topics = await topicsModel.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).sort(sort);
//     res.render("admin/pages/topics/index",{topics:topics,objPagination:resultPagination});
// }
// export const create = async (req:Request,res:Response):Promise<void>=>{
//     const categorys = await categorysModel.find();
//     res.render("admin/pages/topics/create",{categorys:categorys});
// }
// export const createPost = async (req:Request,res:Response):Promise<void>=>{
//     const topicBody = {
//         title:req.body.title,
//         avatar:req.body.avatar,
//         description:req.body.description,
//         status:req.body.status,
//         categoryId:req.body.categoryId,
//     }
//     try{
//         const topic = new topicsModel(topicBody);
//         await topic.save();
//         req["flash"]("success","Thêm chủ đề thành công!!!");
//         res.redirect("back");
//     }catch(error){
//         req["flash"]("error","Thêm chủ đề thất bại!!!");
//         res.redirect("back");

//     }
// }
// export const detail = async (req:Request,res:Response):Promise<void>=>{
//     const idTopic = req.params.id;
    
//     try{
//         const topic = await topicsModel.findOne({_id:idTopic});
//          res.render("admin/pages/topics/detail",{topic:topic})
//     }catch(error){
//         res.redirect("back");
//     }
// }
// export const edit = async (req:Request,res:Response):Promise<void>=>{
//     const idTopic = req.params.id;
    
//     try{
//         const categorys = await categorysModel.find({});
//         const topic = await topicsModel.findOne({_id:idTopic});
//         res.render("admin/pages/topics/edit",{topic:topic,categorys:categorys})
//     }catch(error){
//         res.redirect("back");
//     }

// }

// export const actionUpdate = async(req:Request,res:Response):Promise<void>=>{
//     const idTopic = req.params.id;
//     const actionUpdate = req.params.actionUpdate;
//     let valueUpdate:(string|boolean) = req.params.status;

//     if(req.params.status=="true")
//         valueUpdate=true;

//     try{
//         await topicsModel.updateOne({
//             _id:idTopic
//         },{
//             [actionUpdate]:valueUpdate
//         })
//         res.json({
//             code:200,
//             message:"Cập nhật thành công !!"
//         })
//     }catch(error){
//         res.json({
//             code:404,
//             message:"Cập nhật thất bại !!"
//         })
//     }
    
    
// }

// export const editPatch = async(req:Request,res:Response):Promise<void>=>{
//     const idTopic = req.params.id;
//     const topicBody = {
//         title:req.body.title,
//         avatar:req.body.avatar,
//         description:req.body.description,
//         status:req.body.status,
//         categoryId:req.body.categoryId
//     } 
//     try{
//         await topicsModel.updateOne({
//             _id:idTopic
//         },topicBody);
//         req["flash"]("success","Cập nhật chủ đề thành công!!!");
//         res.redirect("back");
//     }catch(error){
//         req["flash"]("error","Cập nhật chủ đề thất bại!!!");
//         res.redirect("back");
//     }
// }


// export const changeMulti = async (req:Request,res:Response):Promise<void>=>{
//     const type= req.body.type;
//     const value = JSON.parse(req.body.value);

//         switch(type){
//             case "active":
//                 await topicsModel.updateMany({
//                     _id:value
//                 },{
//                     status:"active"
//                 });
//                 break;
//             case "inactive":
//                 await topicsModel.updateMany({
//                     _id:value
//                 },{
//                     status:"inactive"
//                 })
//                 break;
//             case "delete-all":
//                 await topicsModel.updateMany({
//                     _id:value
//                 },{
//                     deleted:true
//                 })
//                 break;
//             default:
//                 req["flash"]("error","Cập nhật chủ đề thất bại!!!");
//                 res.redirect("back");
//                 return;
//             }
//     req["flash"]("success","Cập nhật chủ đề thành công!!!");
//     res.redirect("back");
// }

