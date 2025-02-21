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
exports.suggestFindProducts = void 0;
const products_model_1 = __importDefault(require("../../models/products.model"));
const product_categorys_model_1 = __importDefault(require("../../models/product-categorys.model"));
const convertToSlug_helper_1 = __importDefault(require("../../helpers/convertToSlug.helper"));
const suggestFindProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyWord = req.query.keyword;
    const categorys = yield product_categorys_model_1.default.find({});
    const products = yield products_model_1.default.find({ slug: new RegExp((0, convertToSlug_helper_1.default)(keyWord)) }).select("title slug productCategoryId thumbnail ").lean().limit(6);
    products.forEach(product => {
        const categoryTitle = categorys.find(category => category.id == product.productCategoryId);
        product.categoryTitle = categoryTitle.title;
    });
    res.json({
        code: 200,
        data: products
    });
});
exports.suggestFindProducts = suggestFindProducts;
