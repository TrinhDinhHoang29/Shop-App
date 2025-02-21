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
exports.deleted = exports.detail = void 0;
const orders_models_1 = __importDefault(require("../../models/orders.models"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const chat_socket_1 = require("../../sockets/chat.socket");
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
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
        res.render("client/pages/orders/detail", { order: order });
    }
    catch (error) {
        console.log("erro:" + error);
        res.send("Server error " + error);
    }
    (0, chat_socket_1.chatSocket)(res);
});
exports.detail = detail;
const deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const order = yield orders_models_1.default.findOne({
            _id: orderId
        });
        if (order.status === "ordered") {
            yield orders_models_1.default.updateOne({
                _id: orderId
            }, {
                status: "cancel"
            });
            req["flash"]("success", "Hủy đơn hàng thành công !!");
            res.redirect("back");
        }
        else {
            req["flash"]("error", "Hủy đơn hàng không thành công !!");
            res.redirect("back");
        }
    }
    catch (erro) {
        res.status(404).send("Server error !!");
    }
});
exports.deleted = deleted;
