import express,{Express, Request,Response} from 'express';
import sendOtpHelper from '../../helpers/sendOtp.helper';
export const create = async (req:Request,res:Response):Promise<void>=>{
    if(res.locals.account){    
        sendOtpHelper(req,res,res.locals.account.email)
    }
}
