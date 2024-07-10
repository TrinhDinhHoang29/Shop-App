import express,{Router} from 'express';
import * as orders from '../../controllers/client/orders.controller';
import * as validate from '../../validates/checkouts.validate';
import * as authMiddlewares from '../../middlewares/auth.middleware'

const router = Router();


router.get("/:id",authMiddlewares.existsOrder,orders.detail);
router.get("/delete/:id",authMiddlewares.existsOrder,orders.deleted);



export default router;


