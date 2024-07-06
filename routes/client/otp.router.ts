
import express,{Router} from 'express';
import * as otpController from '../../controllers/client/otp.controller';

const router = Router();


router.post("/create",otpController.create)
router.post("/create-forgot-password",otpController.createForgotPassword)


export default router;


