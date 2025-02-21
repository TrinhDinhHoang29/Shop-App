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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionsPatch = exports.permissions = exports.editPatch = exports.edit = exports.changeMulti = exports.actionUpdate = exports.createPost = exports.create = exports.detail = exports.index = void 0;
const roles_model_1 = __importDefault(require("../../models/roles.model"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const isValid = __importStar(require("../../validates/isValids.validates"));
const roles_model_2 = __importDefault(require("../../models/roles.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sort = {
        title: "asc"
    };
    let filter = {
        deleted: false
    };
    if (req.query.typeFilter) {
        filter.status = req.query.typeFilter;
    }
    if (isValid.isValidSort(req.query.sort)) {
        sort.title = req.query.sort;
    }
    let objPagination = {
        limiteItem: 4,
        currentPage: 1,
    };
    if (isValid.isValidLimiteItem(req.query.limiteItem)) {
        objPagination.limiteItem = req.query.limiteItem;
    }
    const countrole = yield roles_model_1.default.find(filter).countDocuments();
    objPagination.totalPage = Math.ceil(countrole / objPagination.limiteItem);
    const resultPagination = (0, pagination_1.default)(objPagination, req.query);
    const roles = yield roles_model_1.default.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).sort(sort).lean();
    const accounts = yield account_model_1.default.find({});
    for (const role of roles) {
        const account = accounts.find(item => item.id == role.createdBy["id"]);
        role["fullNameCreater"] = account.fullName;
    }
    res.render("admin/pages/roles/index", { roles: roles, objPagination: resultPagination });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idRole = req.params.id;
    const role = yield roles_model_1.default.findOne({ _id: idRole });
    res.render("admin/pages/roles/detail", { role: role });
});
exports.detail = detail;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/roles/create");
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleBody = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            createdBy: { id: res.locals.account._id }
        };
        const role = new roles_model_1.default(roleBody);
        yield role.save();
        req["flash"]("success", "Thêm thành công !!!");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Thêm thất bại !!!");
        res.redirect("back");
    }
});
exports.createPost = createPost;
const actionUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idRole = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate = req.params.status;
    console.log(idRole, actionUpdate, valueUpdate);
    if (req.params.status == "true")
        valueUpdate = true;
    try {
        yield roles_model_1.default.updateOne({
            _id: idRole
        }, {
            [actionUpdate]: valueUpdate
        });
        res.json({
            code: 200,
            message: "Cập nhật thành công !!"
        });
    }
    catch (error) {
        res.json({
            code: 404,
            message: "Cập nhật thất bại !!"
        });
    }
});
exports.actionUpdate = actionUpdate;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.body.type;
    const value = JSON.parse(req.body.value);
    switch (type) {
        case "active":
            yield roles_model_1.default.updateMany({
                _id: value
            }, {
                status: "active"
            });
            break;
        case "inactive":
            yield roles_model_1.default.updateMany({
                _id: value
            }, {
                status: "inactive"
            });
            break;
        case "delete-all":
            yield roles_model_1.default.updateMany({
                _id: value
            }, {
                deleted: true
            });
            break;
        default:
            req["flash"]("error", "Cập nhật thất bại!!!");
            res.redirect("back");
            return;
    }
    req["flash"]("success", "Cập nhật thành công!!!");
    res.redirect("back");
});
exports.changeMulti = changeMulti;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idRole = req.params.id;
        const roleEdit = yield roles_model_1.default.findOne({ _id: idRole });
        const account = yield account_model_1.default.find({ _id: roleEdit.createdBy["id"] });
        roleEdit["fullNameCreater"] = account["fullName"];
        res.render("admin/pages/roles/edit", { roleEdit: roleEdit });
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roleId = req.params.id;
    const roleBody = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
    };
    try {
        yield roles_model_1.default.updateOne({
            _id: roleId
        }, roleBody);
        req["flash"]("success", "Cập nhật thành công!!!");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Cập nhật thất bại!!!");
        res.redirect("back");
    }
});
exports.editPatch = editPatch;
const permissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roles_model_1.default.find({ status: "active", deleted: false });
    res.render("admin/pages/roles/permissions", { roles: roles });
});
exports.permissions = permissions;
const permissionsPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyPermissions = req.body;
        for (const item of bodyPermissions) {
            yield roles_model_2.default.updateOne({
                _id: item.id
            }, {
                permissions: item.permissions
            });
        }
        res.json({
            code: 200,
            mess: "Update success!!"
        });
    }
    catch (error) {
        res.json({
            code: 404,
            mess: "Update error!!"
        });
    }
});
exports.permissionsPatch = permissionsPatch;
