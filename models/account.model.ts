import mongoose, { Schema } from "mongoose";
import slug from 'mongoose-slug-updater';
import random from 'random-token';
const randomToken = random.create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
mongoose.plugin(slug);
const accountSchema:Schema = new  mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    status:String,
    roleId:String,
    avatar:String,
    token:{
        type:String,
        default:randomToken(20)
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deleteAt:Date
    
},{
    timestamps:true
});
const accounts = mongoose.model("Accounts",accountSchema,"accounts");
export default accounts;