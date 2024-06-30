import express,{Router} from 'express';
import * as productsController from '../../controllers/admin/products.controller';
import multer from 'multer';
const upload = multer();
import * as uploadCloud from "../../middlewares/uploadCloud.middleware";
import * as validate from "../../validates/products.validate";
const router:Router = Router();




router.get("/",productsController.index);
router.get("/create",productsController.create);
router.post("/create",upload.fields([
    {name:"thumbnail",maxCount:1},
    {name:"images",maxCount:3}
]),uploadCloud.uploadFields,validate.valiCreate,productsController.createPost);
router.get("/detail/:id",productsController.detail);
router.get("/edit/:id",productsController.edit);

router.patch("/edit/:id",upload.fields([
    {name:"thumbnail",maxCount:1},
    {name:"images",maxCount:3}]),
uploadCloud.uploadFields,
validate.valiEdit,
productsController.editPatch);

router.patch("/:actionUpdate/:id/:status",productsController.actionUpdate);

router.patch("/change-multi",productsController.changeMulti)
export default router;


