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
exports.actionUpdate = exports.detail = exports.index = void 0;
const orders_models_1 = __importDefault(require("../../models/orders.models"));
const isValid = __importStar(require("../../validates/isValids.validates"));
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = {
        deleted: false
    };
    if (req.query.typeFilter) {
        filter.status = req.query.typeFilter;
    }
    let objPagination = {
        limiteItem: 4,
        currentPage: 1,
    };
    if (isValid.isValidLimiteItem(req.query.limiteItem)) {
        objPagination.limiteItem = req.query.limiteItem;
    }
    const countItem = yield orders_models_1.default.find(filter).countDocuments();
    objPagination.totalPage = Math.ceil(countItem / objPagination.limiteItem);
    const resultPagination = (0, pagination_1.default)(objPagination, req.query);
    const orders = yield orders_models_1.default.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).lean();
    orders.forEach(order => {
        const date = new Date(order.createdAt);
        order.dateTime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    });
    res.render("admin/pages/orders/index", { orders: orders, objPagination: resultPagination });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const order = yield orders_models_1.default.findOne({ _id: orderId }).lean();
        const productIds = order.products.map(item => item.product_id);
        const products = yield products_model_1.default.find({
            _id: {
                $in: productIds
            }
        }).select("title thumbnail");
        for (const product of order.products) {
            const record = products.find(item => item._id == product.product_id);
            product.title = record.title;
            product.thumbnail = record.thumbnail;
        }
        res.render("admin/pages/orders/detail", { order: order });
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.detail = detail;
const actionUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate = req.params.status;
    if (req.params.status == "true")
        valueUpdate = true;
    try {
        yield orders_models_1.default.updateOne({
            _id: id
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
