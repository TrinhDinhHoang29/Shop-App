import express,{Router} from 'express';
import * as searchController from '../../controllers/client/search.controller';
const router = Router();

// router.get("/",searchController.index);
router.get("/suggestFindProducts",searchController.suggestFindProducts)


export default router;


