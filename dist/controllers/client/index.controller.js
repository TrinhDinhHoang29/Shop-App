"use strict";
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
exports.index = void 0;
const product_categorys_model_1 = __importDefault(require("../../models/product-categorys.model"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const chat_socket_1 = require("../../sockets/chat.socket");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorys = yield product_categorys_model_1.default.
        find({ status: "active", deleted: false }).
        limit(5).
        sort({ posision: "asc" });
    const arrCategoryId = categorys.map(item => item._id);
    const products = yield products_model_1.default.find({
        productCategoryId: {
            $in: arrCategoryId
        },
        status: "active",
        deleted: false
    }).sort({
        createdAt: "desc"
    }).limit(12).lean();
    for (const product of products) {
        const category = categorys.find(item => item._id == product.productCategoryId);
        product.slugCategory = category.slug;
    }
    const productSellers = yield products_model_1.default.find({ status: "active", deleted: false, type: "seller" }).limit(3).sort({ posision: "asc" });
    const productTrends = yield products_model_1.default.find({ status: "active", deleted: false, type: "trend" }).limit(3).sort({ posision: "asc" });
    const productFeatures = yield products_model_1.default.find({ status: "active", deleted: false, type: "feature" }).limit(3).sort({ posision: "asc" });
    res.render("client/pages/home/index", {
        categorys,
        products,
        productSellers,
        productTrends,
        productFeatures
    });
    (0, chat_socket_1.chatSocket)(res);
});
exports.index = index;
