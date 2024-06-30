import express,{Router} from 'express';
import * as rolesController from '../../controllers/admin/roles.controller';
const router = Router();
import * as validate from '../../validates/role.validate'


router.get("/",rolesController.index)
router.get("/create",rolesController.create);
router.get("/detail/:id",rolesController.detail);
router.get("/edit/:id",rolesController.edit);
router.patch("/edit/:id",validate.valiCreate,rolesController.editPatch);

router.post("/create",validate.valiCreate,rolesController.createPost);
router.patch("/:actionUpdate/:id/:status",rolesController.actionUpdate);
router.patch("/change-multi",rolesController.changeMulti);
router.get("/permissions",rolesController.permissions);
router.patch("/permissions",rolesController.permissionsPatch);


export default router;


