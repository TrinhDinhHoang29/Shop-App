import express,{Router} from 'express';
import * as homeController from '../../controllers/admin/home.controller';

const router = Router();


router.get("/",homeController.index)


export default router;


