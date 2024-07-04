import express,{Router} from 'express';
import * as carts from '../../controllers/client/carts.controller'
import * as validate from '../../validates/carts.validate';

const router = Router();

router.get("/",carts.index);

router.get("/add/:product_id/:quantity/:type",validate.valiAdd,carts.addToCart)
router.get("/deleted/:product_id",carts.deleteProduct)


export default router;


