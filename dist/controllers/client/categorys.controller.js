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
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const chat_socket_1 = require("../../sockets/chat.socket");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugCategory = req.params.slug;
        const priceStart = req.query.priceStart;
        const priceEnd = req.query.priceEnd;
        let category = [];
        let filter = {
            status: "active",
            deleted: false,
        };
        if (slugCategory != "all") {
            category = yield product_categorys_model_1.default.findOne({ slug: slugCategory, status: "active", deleted: false });
            filter = {
                status: "active",
                deleted: false,
                productCategoryId: category.id
            };
        }
        if (priceEnd && priceStart) {
            filter.price = {
                $gte: priceStart,
                $lte: priceEnd
            };
        }
        let objPagination = {
            limiteItem: 9,
            currentPage: 1,
        };
        const countProduct = yield products_model_1.default.find(filter).countDocuments();
        objPagination.totalPage = Math.ceil(countProduct / objPagination.limiteItem);
        const resultPagination = (0, pagination_1.default)(objPagination, req.query);
        const products = yield products_model_1.default.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem);
        res.render("client/pages/categorys/index", { category, products, objPagination: resultPagination });
        (0, chat_socket_1.chatSocket)(res);
    }
    catch (error) {
        res.status(404).send("Page error" + error);
    }
});
exports.index = index;
