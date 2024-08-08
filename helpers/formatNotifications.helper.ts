import notificationsModel from "../models/notifications.model"
import { calculateTimeDifference } from "./calculateTimeDifference.helper";
import usersModel from "../models/user.model";
export const formatNotificationHelper = async ()=>{
    const notifications:any = await notificationsModel.find({deleted:false}).sort({createdAt:"desc"}).limit(6).lean();
    for(const notification of notifications ){
        notification.timeDifference = calculateTimeDifference(notification.createdAt);
        const user = await usersModel.findOne({_id:notification.user_id}).select("fullName");
        notification.fullName = user.fullName;
    }
    return notifications;
}