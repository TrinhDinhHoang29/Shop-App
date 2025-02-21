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
exports.changeMulti = exports.actionUpdate = exports.editPatch = exports.edit = exports.detail = exports.createPost = exports.create = exports.index = void 0;
const isValid = __importStar(require("../../validates/isValids.validates"));
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const product_categorys_model_1 = __importDefault(require("../../models/product-categorys.model"));
const treeCategorys_helper_1 = require("../../helpers/treeCategorys.helper");
const account_model_1 = __importDefault(require("../../models/account.model"));
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
    const countcategory = yield product_categorys_model_1.default.find(filter).countDocuments();
    objPagination.totalPage = Math.ceil(countcategory / objPagination.limiteItem);
    const resultPagination = (0, pagination_1.default)(objPagination, req.query);
    const productCategorys = yield product_categorys_model_1.default.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).sort(sort).lean();
    const accounts = yield account_model_1.default.find({}).select("fullName");
    productCategorys.forEach(category => {
        const infoCreated = accounts.find(item => item.id == category.createdBy.id);
        category.fullNameCreated = infoCreated.fullName;
        const date = new Date(category.createdAt);
        category.fomatDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    });
    res.render("admin/pages/product-categorys/index", { productCategorys: productCategorys, objPagination: resultPagination });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryProducts = yield product_categorys_model_1.default.find({ status: "active", deleted: false });
    const records = (0, treeCategorys_helper_1.treeCategorys)(categoryProducts);
    res.render("admin/pages/product-categorys/create", { records: records });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let posision = req.body.posision;
    const idParentCreate = res.locals.account._id;
    if (posision.trim() == '') {
        posision = yield product_categorys_model_1.default.countDocuments({ deleted: false });
    }
    const categoryBody = {
        title: req.body.title,
        parentId: req.body.parentId,
        posision: parseInt(posision),
        description: req.body.description,
        status: req.body.status,
        thumbnail: req.body.thumbnail,
        createdBy: {
            id: idParentCreate
        }
    };
    try {
        const category = new product_categorys_model_1.default(categoryBody);
        yield category.save();
        req["flash"]("success", "Thêm thành công!!!");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Thêm thất bại!!!");
        res.redirect("back");
    }
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCategory = req.params.id;
    try {
        const category = yield product_categorys_model_1.default.findOne({ _id: idCategory });
        res.render("admin/pages/categorys/detail", { category: category });
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCategory = req.params.id;
    const categoryProducts = yield product_categorys_model_1.default.find({ status: "active", deleted: false });
    const records = (0, treeCategorys_helper_1.treeCategorys)(categoryProducts);
    try {
        const productCategory = yield product_categorys_model_1.default.findOne({ _id: idCategory });
        res.render("admin/pages/product-categorys/edit", { productCategory: productCategory, records: records });
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCategory = req.params.id;
    const idParentCreate = res.locals.account._id;
    let posision = req.body.posision;
    if (!posision.trim()) {
        posision = yield product_categorys_model_1.default.countDocuments({ deleted: false });
    }
    const categoryBody = {
        title: req.body.title,
        parentId: req.body.parentId,
        posision: parseInt(posision.trim()),
        description: req.body.description,
        status: req.body.status,
        thumbnail: req.body.thumbnail,
        createdBy: {
            id: idParentCreate
        }
    };
    try {
        yield product_categorys_model_1.default.updateOne({
            _id: idCategory
        }, categoryBody);
        req["flash"]("success", "Cập nhật thành công!!!");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Cập nhật thất bại!!!" + error);
        res.redirect("back");
    }
});
exports.editPatch = editPatch;
const actionUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCategory = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate = req.params.status;
    if (req.params.status == "true")
        valueUpdate = true;
    try {
        yield product_categorys_model_1.default.updateOne({
            _id: idCategory
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
            yield product_categorys_model_1.default.updateMany({
                _id: value
            }, {
                status: "active"
            });
            break;
        case "inactive":
            yield product_categorys_model_1.default.updateMany({
                _id: value
            }, {
                status: "inactive"
            });
            break;
        case "delete-all":
            yield product_categorys_model_1.default.updateMany({
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
