import mongoose, { Schema } from "mongoose";
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const productSchema:Schema = new  mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    discountPercentage:Number,
    stock:Number,
    productCategoryId:String,
    thumbnail:String,
    status:String,
    images:Array,
    posision:Number,
    slug:{
        type:String,
        slug:"title",
        unique:true
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deletedBy:{
        id:String,
        deleteAt:Date
    },
    createdBy:{
        id:String,
        createAt:{
            type:Date,
            default:Date.now
        }
    }
},{
    timestamps:true
});
const products = mongoose.model("products",productSchema,"products");
export default products;