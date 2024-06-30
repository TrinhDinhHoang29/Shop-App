import mongoose,{Schema} from "mongoose";
import random from "random-token";
const randomOTP = random.create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
const OTPSchema:Schema = new mongoose.Schema({
    email:String,
    expireAt:{
        type:Date,
        expires:180
    },
    otp:{
        type:String,
        default:randomOTP(5)
    }
},{
    timestamps:true
});
const OTP = mongoose.model("OTP",OTPSchema,"otp");
export default  OTP;