import express,{Router} from 'express';
import * as authController from '../../controllers/admin/auth.controller';
import * as validate from '../../validates/auth.validate';
const router = Router();


router.get("/login",authController.login)
router.patch("/login",validate.loginValid,authController.loginPost);
router.get("/logout",authController.logOut);
export default router;


