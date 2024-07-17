import express,{Router} from 'express';
import * as reviewsController from '../../controllers/client/reviews.controller';
import multer from 'multer';
const upload = multer();
import * as uploadCloud from "../../middlewares/uploadCloud.middleware";
const router = Router();
import * as validate from '../../validates/reviews.validate';

router.get("/:order_id/:product_id",reviewsController.index);
router.post("/:order_id/:product_id",validate.valiAdd,upload.fields([
    {name:"thumbnail",maxCount:1},
    {name:"images",maxCount:3}]),
uploadCloud.uploadFields,reviewsController.indexPost);



export default router;


