import express,{Router} from 'express';
import * as profileController from '../../controllers/admin/profile.controller';
const router = Router();
import multer from 'multer';
const upload = multer();
import * as uploadCloud from "../../middlewares/uploadCloud.middleware";
import * as validate from '../../validates/profile.validate';


router.get("/",profileController.index)
router.patch("/",upload.single("avatar"),uploadCloud.uploadSingle,validate.updateProfileValid,profileController.indexPatch)
router.get("/change-password",profileController.changePassword);
router.patch("/change-password",validate.changePasswordValid,profileController.changePasswordPatch);
router.get("/change-email",profileController.changeEmail);
router.patch("/change-email",validate.changeEmailValid,profileController.changeEmailPatch);

export default router;


