import express,{Router} from 'express';
import * as homeController from '../../controllers/client/index.controller';

const router = Router();


router.get("/",homeController.index)


export default router;


