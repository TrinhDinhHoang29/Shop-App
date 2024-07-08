import express,{Router} from 'express';
import * as checkouts from '../../controllers/client/checkout.controller';
import * as validate from '../../validates/checkouts.validate';
const router = Router();


router.get("/",checkouts.index);
router.patch("/",validate.valiCheckStock,validate.valiAdd,checkouts.checkoutsPost);


export default router;


