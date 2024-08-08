import express,{Express, Request,Response} from 'express';
import notificationsModel from '../../models/notifications.model';




export const update_read = async (req:Request,res:Response):Promise<void>=>{
    try{
        const notification_id = req.params.notification_id;
        const notification = await notificationsModel.findOne({_id:notification_id});
        if(notification.is_read===false) 
            await notificationsModel.updateOne({_id:notification_id},{is_read:true});
        res.json({
            code:200,
            data:notification_id
        })
    }catch(error){
        res.json({
            code:404,
            message:"error"
        })
    }
}