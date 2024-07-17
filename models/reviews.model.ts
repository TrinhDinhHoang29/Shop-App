import mongoose, { Schema } from "mongoose";

const reviewsSchema:Schema = new  mongoose.Schema({
    product_id:String,
    user_id:String,
    rating:String,
    comment:String,
    images:Array


},{
    timestamps:true
});
const reviews = mongoose.model("reviews",reviewsSchema,"reviews");
export default reviews;