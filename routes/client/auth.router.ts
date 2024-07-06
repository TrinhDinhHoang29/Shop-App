import express,{Router} from 'express';
import * as authController from '../../controllers/client/auth.controller';
const router = Router();
import * as validate from '../../validates/user.validate';
import * as authMiddleware from '../../middlewares/auth.middleware';

router.get("/login",authController.login);
router.patch("/login",validate.valiLogin,authController.loginPatch);

router.get("/register",authController.register);
router.post("/register",validate.valiCreate,authController.registerPost);
router.get("/logout",authController.logOut);
router.get("/forgot-password",authController.forgotPassowrd);
router.patch("/forgot-password",authController.forgotPassowrdPatch);
router.get("/comfirm-password-new",authMiddleware.existsUserInfo,authController.comfirmPasswordNew);
router.patch("/comfirm-password-new",authMiddleware.existsUserInfo,authController.comfirmPasswordNewPatch);


export default router;


