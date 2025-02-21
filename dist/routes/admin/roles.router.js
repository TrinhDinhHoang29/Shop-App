"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesController = __importStar(require("../../controllers/admin/roles.controller"));
const router = (0, express_1.Router)();
const validate = __importStar(require("../../validates/role.validate"));
router.get("/", rolesController.index);
router.get("/create", rolesController.create);
router.get("/detail/:id", rolesController.detail);
router.get("/edit/:id", rolesController.edit);
router.patch("/edit/:id", validate.valiCreate, rolesController.editPatch);
router.post("/create", validate.valiCreate, rolesController.createPost);
router.patch("/:actionUpdate/:id/:status", rolesController.actionUpdate);
router.patch("/change-multi", rolesController.changeMulti);
router.get("/permissions", rolesController.permissions);
router.patch("/permissions", rolesController.permissionsPatch);
exports.default = router;
