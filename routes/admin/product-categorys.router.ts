import express,{Router} from 'express';
import * as productCategorysModel from '../../controllers/admin/product-categorys.controller';
import multer from 'multer';
const upload = multer();
import * as uploadCloud from "../../middlewares/uploadCloud.middleware";
import * as validate from "../../validates/product-categorys.validate";
const router:Router = Router();




router.get("/",productCategorysModel.index);
router.get("/create",productCategorysModel.create);
router.post("/create",upload.single("thumbnail"),uploadCloud.uploadSingle,
            validate.valiCreate,
            productCategorysModel.createPost);
// router.get("/detail/:id",productsController.detail);
router.get("/edit/:id",productCategorysModel.edit);

router.patch("/edit/:id",
            upload.single('thumbnail'),
            uploadCloud.uploadSingle,
            validate.valiEdit,
            productCategorysModel.editPatch);

router.patch("/:actionUpdate/:id/:status",productCategorysModel.actionUpdate);

router.patch("/change-multi",productCategorysModel.changeMulti)
export default router;


