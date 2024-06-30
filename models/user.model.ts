import mongoose, { Schema } from "mongoose";
import slug from 'mongoose-slug-updater';
import random from 'random-token';
const randomToken = random.create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
mongoose.plugin(slug);
const userSchema:Schema = new  mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    status:{
        type:String,
        default:"active"
    },
    avatar:String,
    tokenUser:{
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
const users = mongoose.model("Users",userSchema,"users");
export default users;