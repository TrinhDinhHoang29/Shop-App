import express,{Router} from 'express';
import * as profileController from '../../controllers/client/profile.controller';
import multer from 'multer';
const upload = multer();
import * as uploadCloud from "../../middlewares/uploadCloud.middleware";
const router = Router();
import * as validate from '../../validates/user.validate';

router.get("/",profileController.index)
router.patch("/",upload.single('avatar'),uploadCloud.uploadSingle,validate.valiEdit,profileController.updateProfile);
router.get("/change-email",profileController.changeEmail)
router.patch("/change-email",validate.changeEmailValid,profileController.changeEmailPatch);
router.get("/change-password",profileController.changePassword)
router.patch("/change-password",validate.changePasswordValid,profileController.changePasswordPatch)


export default router;


