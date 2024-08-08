import express,{Router} from 'express';
import * as orderController from '../../controllers/admin/orders.controller';

const router = Router();


router.get("/",orderController.index)
router.get("/detail/:orderId",orderController.detail)

router.patch("/:actionUpdate/:id/:status",orderController.actionUpdate);


export default router;


