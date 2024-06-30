import express,{Router} from 'express';
import * as accountsController from '../../controllers/admin/accounts.controller';
import multer from 'multer';
const upload = multer();
import * as uploadCloud from "../../middlewares/uploadCloud.middleware";
import * as validate from "../../validates/account.validate";
const router:Router = Router();




router.get("/",accountsController.index);
router.get("/create",accountsController.create);
router.post("/create",upload.single('avatar'),uploadCloud.uploadSingle,validate.valiCreate,accountsController.createPost);
router.get("/detail/:id",accountsController.detail);
router.get("/edit/:id",accountsController.edit);
router.patch("/edit/:id",upload.single('avatar'),uploadCloud.uploadSingle,validate.valiEdit,accountsController.editPatch);
router.patch("/:actionUpdate/:id/:status",accountsController.actionUpdate);

router.patch("/change-multi",accountsController.changeMulti)
export default router;


