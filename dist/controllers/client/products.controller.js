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
exports.listProducts = exports.detail = void 0;
const products_model_1 = __importDefault(require("../../models/products.model"));
const reviews_model_1 = __importDefault(require("../../models/reviews.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const chat_socket_1 = require("../../sockets/chat.socket");
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        const product = yield products_model_1.default.findOne({ slug: slug, status: "active", deleted: false });
        const products = yield products_model_1.default.find({ slug: { $ne: slug }, productCategoryId: product.productCategoryId, status: "active", deleted: false }).limit(4);
        const reviews = yield reviews_model_1.default.find({ product_id: product._id }).select("-password -tokenUser ").lean();
        const users = yield user_model_1.default.find({});
        reviews.forEach(review => {
            const user = users.find(item => item.id == review.user_id);
            review.user = user;
            const date = new Date(review.createdAt);
            review.date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        });
        res.render("client/pages/products/detail", { product, products, reviews: reviews });
        (0, chat_socket_1.chatSocket)(res);
    }
    catch (error) {
        res.status(404).send("Page error" + error);
    }
});
exports.detail = detail;
const listProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const priceStart = req.params.priceStart;
        const priceEnd = req.params.priceEnd;
        const products = yield products_model_1.default.find({
            status: "active",
            deleted: false,
            price: {
                $gte: priceStart,
                $lte: priceEnd
            }
        });
        res.json({
            code: 200,
            products: products
        });
    }
    catch (error) {
        res.json({
            code: 404,
            error: error
        });
    }
});
exports.listProducts = listProducts;
