import express,{Express, Request,Response} from 'express';
import ordersModel from '../../models/orders.models';
import * as isValid from "../../validates/isValids.validates";
import paginationHelper from '../../helpers/pagination';
import productCategorysModel from '../../models/product-categorys.model';
import productsModel from '../../models/products.model'
export const index = async (req:Request,res:Response):Promise<void>=>{
    type typeFilter={
        deleted:boolean,
        status?:string,
    }

    let filter:typeFilter = {
        deleted:false
    }
    if(req.query.typeFilter){
        filter.status = req.query.typeFilter as string;
    }

    // pagination start -----------------------------------
    let objPagination:any = {
        limiteItem:4,
        currentPage:1,   
    }
    if(isValid.isValidLimiteItem(req.query.limiteItem)){
        objPagination.limiteItem=req.query.limiteItem;
    }
    const countItem = await ordersModel.find(filter).countDocuments();
    objPagination.totalPage = Math.ceil(countItem/objPagination.limiteItem);
    const resultPagination = paginationHelper(objPagination,req.query);

    // pagination end ---------------------------------------

    const orders:any = await ordersModel.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).lean();
    orders.forEach(order=>{
        const date:Date = new Date(order.createdAt);
        order.dateTime = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    })
    res.render("admin/pages/orders/index",{orders:orders,objPagination:resultPagination});
}
// export const create = async (req:Request,res:Response):Promise<void>=>{
//     const productCategorys = await productCategorysModel.find({});
//     res.render("admin/pages/products/create",{productCategorys});
// }
// export const createPost = async (req:Request,res:Response):Promise<void>=>{
//     const {type,title,description,price,discountPercentage,stock,status,thumbnail,images,productCategoryId} = req.body;
//     let posision:any = req.body.posision;
//     if(!posision.trim()){
//         posision = await productsModel.countDocuments({deleted:false});
//     }
//     const productBody = {
//         title:title,
//         description:description,
//         price:parseFloat(price),
//         discountPercentage:parseFloat(discountPercentage),
//         stock:parseInt(stock),
//         status:status,
//         thumbnail:thumbnail,
//         images:images,
//         posision:parseInt(posision),
//         productCategoryId:productCategoryId,
//         type:type
//     }
//     try{
//         const product = new productsModel(productBody);
//         await product.save();
//         req["flash"]("success","Thêm thành công!!!");
//         res.redirect("back");
//     }catch(error){
//         req["flash"]("error","Thêm thất bại!!!");
//         res.redirect("back");
//     }
// }
export const detail = async (req:Request,res:Response):Promise<void>=>{
    try{

        const orderId = req.params.orderId;
        const order:any = await ordersModel.findOne({_id:orderId}).lean();
        const productIds = order.products.map(item=>item.product_id);
        const products = await productsModel.find({
            _id:{
                $in:productIds
            }
        }).select("title thumbnail");
        
        for(const product of order.products){
            const record = products.find(item=>item._id==product.product_id);
            product.title = record.title;
            product.thumbnail = record.thumbnail;
        }
        res.render("admin/pages/orders/detail",{order:order})
    }catch(error){
        res.redirect("back");
    }
    
}
// export const edit = async (req:Request,res:Response):Promise<void>=>{
//     const id = req.params.id;
//     const productCategorys = await productCategorysModel.find({});

//     try{
//         const product = await productsModel.findOne({_id:id});
//         res.render("admin/pages/products/edit",{product:product,productCategorys:productCategorys})
//     }catch(error){
//         res.redirect("back");
//     }

// }
// export const editPatch = async(req:Request,res:Response):Promise<void>=>{
//     const id = req.params.id; 
//     const {type,title,description,price,discountPercentage,stock,status,thumbnail,images,productCategoryId} = req.body;
//     const productBody = {
//         title:title,
//         description:description,
//         price:parseFloat(price),
//         discountPercentage:parseFloat(discountPercentage),
//         stock:parseInt(stock),
//         status:status,
//         thumbnail:thumbnail,
//         images:images,
//         productCategoryId:productCategoryId,
//         type:type

//     }

//     try{
//         await productsModel.updateOne({
//             _id:id
//         },productBody);
//         req["flash"]("success","Cập nhật thành công!!!");
      
//         res.redirect("back");
//     }catch(error){
//         req["flash"]("error","Cập nhật thất bại!!!");
//         res.redirect("back");
//     }
// }
export const actionUpdate = async(req:Request,res:Response):Promise<void>=>{
    const id = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate:(string|boolean) = req.params.status;

    if(req.params.status=="true")
        valueUpdate=true;

    try{
        await ordersModel.updateOne({
            _id:id
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

// export const changeMulti = async (req:Request,res:Response):Promise<void>=>{
//     const type= req.body.type;
//     const value = JSON.parse(req.body.value);

//         switch(type){
//             case "active":
//                 await productsModel.updateMany({
//                     _id:value
//                 },{
//                     status:"active"
//                 });
//                 break;
//             case "inactive":
//                 await productsModel.updateMany({
//                     _id:value
//                 },{
//                     status:"inactive"
//                 })
//                 break;
//             case "delete-all":
//                 await productsModel.updateMany({
//                     _id:value
//                 },{
//                     deleted:true
//                 })
//                 break;
//             default:
//                 req["flash"]("error","Cập nhật thất bại!!!");
//                 res.redirect("back");
//                 return;
//             }
//     req["flash"]("success","Cập nhật thành công!!!");
//     res.redirect("back");
// }