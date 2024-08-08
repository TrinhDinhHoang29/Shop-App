
import express,{Router} from 'express';
import * as notificationController from '../../controllers/admin/notifications.controller';

const router = Router();


router.get("/update_read/:notification_id",notificationController.update_read)


export default router;


