import express,{Router} from 'express';
import * as homeController from '../../controllers/admin/home.controller';
// import {connectSocketAdmin} from '../../sockets/chat.socket';

const router = Router();


router.get("/",homeController.index)
router.get("/message-new",homeController.messageNew)


export default router;


