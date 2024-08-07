import express,{Router} from 'express';
import * as chatsController from '../../controllers/admin/chats.controller';
import multer from 'multer';
const upload = multer();
import * as uploadCloud from "../../middlewares/uploadCloud.middleware";
import * as validate from "../../validates/account.validate";
const router:Router = Router();




router.get("/:room_id",chatsController.index);
export default router;


