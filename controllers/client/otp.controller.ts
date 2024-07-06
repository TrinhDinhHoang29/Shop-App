import express,{Express, Request,Response} from 'express';
import sendOtpHelper from '../../helpers/sendOtp.helper';
import usersModel from '../../models/user.model';
export const create = async (req:Request,res:Response):Promise<void>=>{
    if(res.locals.userInfo){
        await sendOtpHelper(req,res,res.locals.userInfo.email);        
    }
}
export const createForgotPassword = async (req:Request,res:Response):Promise<void>=>{
    const isEmail = await usersModel.findOne({email:req.body.email});
    if(isEmail){
       await sendOtpHelper(req,res,req.body.email);        
    }else{
        res.json({
            code:404,
            mess:"Send otp error !!"
        })
    }
    
}