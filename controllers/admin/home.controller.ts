import express,{Express, Request,Response} from 'express';

import usersModel from '../../models/user.model';
import roomChatModel from '../../models/roomChat.model';
import { roomChatsFillter } from '../../helpers/roomChatFilter.helper';
import { chatSocket,connectSocketAdmin } from '../../sockets/chat.socket';
import ordersModel from '../../models/orders.models';
import reviewsModel from '../../models/reviews.model';
import productsModel from '../../models/products.model';




export const index = async (req:Request,res:Response):Promise<void>=>{
    const ordersSuccess  = await ordersModel.find({status:"success"});   
    const products = await productsModel.find({}).select("title")
    // tổng doanh thu
    const sumRevenue =  ordersSuccess.reduce((previousValue:any,currentValue:any)=>{
        const totalPrice = currentValue.products.reduce((total,current)=>total+((current.price-current.price*(current.discountPercentage/100)*current.quantity)),0)
        return previousValue+totalPrice;
    },0).toFixed(1);
    //end tổng doanh thu
    //Lượt đánh giá trung bình
    const reviews = await reviewsModel.find({});
    const avgReviewsRating = (reviews.reduce((total:any,current:any)=>total+parseInt(current.rating),0) / reviews.length).toFixed(1);
    // Lượt đánh giá trung bình
    const customers = await usersModel.find({status:"active",deleted:false}).select("fullName");
    const countCustomer = customers.length;
    const ordersCancel  = await ordersModel.find({status:"cancel"});

    const cancelRate =( ordersCancel.length/(ordersSuccess.length+ordersCancel.length)*100).toFixed(1);
    
    res.render("admin/pages/home/index",{ordersSuccess,products,sumRevenue,avgReviewsRating,countCustomer,cancelRate});
}
export const messageNew = async (req:Request,res:Response):Promise<void>=>{
    try{
        const data = await roomChatsFillter();
        res.json({
            code:200,
            data:data
        })
    }catch(error){
        res.json({
            code:404,
            message:"error"
        })
    }
}