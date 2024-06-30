import mongoose, { Schema } from "mongoose";
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const categorySchema:Schema = new  mongoose.Schema({
    title:String,
    parentId:String, 
    description:String, 
    status:String, 
    thumbnail:String, 
    posision: Number,
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
const categorys = mongoose.model("Product-Categorys",categorySchema,"product-categorys");
export default categorys;