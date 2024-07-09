import express,{Router} from 'express';
import * as productsController from '../../controllers/client/products.controller';

const router = Router();


router.get("/:slug",productsController.detail)
router.get("/listProducts/:priceStart/:priceEnd",productsController.listProducts)


export default router;


