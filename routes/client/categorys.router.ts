import express,{Router} from 'express';
import * as categorys from '../../controllers/client/categorys.controller';

const router = Router();


router.get("/:slug",categorys.index)


export default router;


