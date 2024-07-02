import express,{Router} from 'express';
import * as productsController from '../../controllers/client/products.controller';

const router = Router();


router.get("/:slug",productsController.detail)


export default router;


