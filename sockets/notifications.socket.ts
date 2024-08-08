import reviewsModel from '../models/reviews.model';
import { formatNotificationHelper } from '../helpers/formatNotifications.helper';
import notificationsModel from "../models/notifications.model";
 export const addNotification = async(res,data)=>{
        
        const notification = new notificationsModel(data);
        await notification.save();
        const notifications = await formatNotificationHelper();
        res["io"].emit("SERVER_RETURN_NOTIFICATION",notifications);
}