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
exports.indexPost = exports.index = void 0;
const products_model_1 = __importDefault(require("../../models/products.model"));
const reviews_model_1 = __importDefault(require("../../models/reviews.model"));
const orders_models_1 = __importDefault(require("../../models/orders.models"));
const chat_socket_1 = require("../../sockets/chat.socket");
const notifications_socket_1 = require("../../sockets/notifications.socket");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.default.findOne({ _id: req.params.product_id });
    res.render("client/pages/reviews/index", { order_id: req.params.order_id, product: product });
    (0, chat_socket_1.chatSocket)(res);
});
exports.index = index;
const indexPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = new reviews_model_1.default({
            product_id: req.params.product_id,
            user_id: res.locals.userInfo._id,
            rating: req.body.rating,
            comment: req.body.comment,
            images: req.body.images
        });
        yield review.save();
        yield orders_models_1.default.updateOne({
            _id: req.params.order_id,
            'products.product_id': req.params.product_id
        }, {
            $set: { 'products.$.reviews_id': review.id }
        });
        const data = {
            user_id: res.locals.userInfo._id,
            type: "reviews",
            type_id: review.id,
        };
        yield (0, notifications_socket_1.addNotification)(res, data);
        req["flash"]("success", "Đánh giá sản phẩm thành công !!");
        res.redirect(`/orders/${req.params.order_id}`);
    }
    catch (error) {
        req["flash"]("error", "Đánh giá sản phẩm thất bại !!");
        console.log(error);
        res.redirect("back");
    }
});
exports.indexPost = indexPost;
