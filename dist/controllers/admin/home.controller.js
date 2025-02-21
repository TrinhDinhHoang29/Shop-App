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
exports.messageNew = exports.index = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const roomChatFilter_helper_1 = require("../../helpers/roomChatFilter.helper");
const orders_models_1 = __importDefault(require("../../models/orders.models"));
const reviews_model_1 = __importDefault(require("../../models/reviews.model"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ordersSuccess = yield orders_models_1.default.find({ status: "success" });
    const products = yield products_model_1.default.find({}).select("title");
    const sumRevenue = ordersSuccess.reduce((previousValue, currentValue) => {
        const totalPrice = currentValue.products.reduce((total, current) => total + ((current.price - current.price * (current.discountPercentage / 100) * current.quantity)), 0);
        return previousValue + totalPrice;
    }, 0).toFixed(1);
    const reviews = yield reviews_model_1.default.find({});
    const avgReviewsRating = (reviews.reduce((total, current) => total + parseInt(current.rating), 0) / reviews.length).toFixed(1);
    const customers = yield user_model_1.default.find({ status: "active", deleted: false }).select("fullName");
    const countCustomer = customers.length;
    const ordersCancel = yield orders_models_1.default.find({ status: "cancel" });
    const cancelRate = (ordersCancel.length / (ordersSuccess.length + ordersCancel.length) * 100).toFixed(1);
    res.render("admin/pages/home/index", { ordersSuccess, products, sumRevenue, avgReviewsRating, countCustomer, cancelRate });
});
exports.index = index;
const messageNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, roomChatFilter_helper_1.roomChatsFillter)();
        res.json({
            code: 200,
            data: data
        });
    }
    catch (error) {
        res.json({
            code: 404,
            message: "error"
        });
    }
});
exports.messageNew = messageNew;
