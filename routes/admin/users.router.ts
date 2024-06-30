import express,{Router} from 'express';
import * as usersController from '../../controllers/admin/users.controller';

const router = Router();


router.get("/getUsers",usersController.users);

export default router;


