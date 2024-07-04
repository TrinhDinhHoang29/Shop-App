import mongoose, { Schema } from "mongoose";

const cartSchema:Schema = new  mongoose.Schema({
    user_id:String,
    products:[
        {
            product_id:String,
            quantity:Number
        }
    ]
},{
    timestamps:true
});
const carts = mongoose.model("carts",cartSchema,"carts");
export default carts;