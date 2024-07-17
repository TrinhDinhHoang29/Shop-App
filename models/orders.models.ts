import mongoose, { Schema } from "mongoose";

const orderSchema:Schema = new  mongoose.Schema({
    user_id:String,
    userInfo:{
        fullName:String,
        phone:String,
        address:String,
        email:String,
        note:String,
    },
    status:{
        type:String,
        default:"ordered"
    }
    ,
    products:[
        {
            product_id:String,
            quantity:Number,
            price:Number,
            discountPercentage:Number,
            reviews_id:String
        }
    ],
    deleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});
const orders = mongoose.model("orders",orderSchema,"orders");
export default orders;