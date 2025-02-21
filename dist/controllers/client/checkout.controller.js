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
exports.checkoutsPost = exports.index = void 0;
const products_model_1 = __importDefault(require("../../models/products.model"));
const orders_models_1 = __importDefault(require("../../models/orders.models"));
const carts_model_1 = __importDefault(require("../../models/carts.model"));
const chat_socket_1 = require("../../sockets/chat.socket");
const notifications_socket_1 = require("../../sockets/notifications.socket");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productIds = res.locals.cart.products.map(item => item.product_id);
        const products = yield products_model_1.default.find({ _id: { $in: productIds } }).select("title price discountPercentage").lean();
        products.forEach(product => {
            const quantity = res.locals.cart.products.find(item => item.product_id == product._id).quantity;
            product.quantity = quantity;
        });
        products.totalPrice = products.reduce((total, current) => {
            const price = (current.price - (current.price * current.discountPercentage / 100)) * current.quantity;
            return total += parseFloat(price);
        }, 0);
        res.render("client/pages/checkouts/index", { products: products });
        (0, chat_socket_1.chatSocket)(res);
    }
    catch (error) {
        res.status(404).send("server error !!");
    }
});
exports.index = index;
const checkoutsPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productOrderIds = res.locals.cart.products.map(item => item.product_id);
        const products = yield products_model_1.default.find({
            _id: {
                $in: productOrderIds
            }
        }).select("id price discountPercentage");
        const productsOder = res.locals.cart.products.map(item => {
            const productOder = products.find(product => product.id == item.product_id);
            return {
                product_id: item.product_id,
                quantity: item.quantity,
                price: productOder.price,
                discountPercentage: productOder.discountPercentage
            };
        });
        const orderBody = {
            user_id: res.locals.userInfo.id,
            userInfo: {
                fullName: `${req.body.firstName} ${req.body.lastName}`,
                phone: req.body.phone,
                address: `${req.body.phuong},${req.body.quan},${req.body.tinh}`,
                email: req.body.email,
                note: req.body.orderNote,
            },
            products: productsOder
        };
        const order = new orders_models_1.default(orderBody);
        yield order.save();
        yield carts_model_1.default.updateOne({
            _id: req.cookies.cartId
        }, {
            $pull: {
                products: {
                    product_id: {
                        $in: productOrderIds
                    }
                }
            }
        });
        const data = {
            user_id: res.locals.userInfo._id,
            type: "orders",
            type_id: order.id,
        };
        yield (0, notifications_socket_1.addNotification)(res, data);
        req["flash"]("success", "Đặt thành công !!");
        res.redirect(`/orders/${order._id}`);
    }
    catch (error) {
        req["flash"]("error", "Đặt thất bại!!");
        res.redirect("back");
    }
});
exports.checkoutsPost = checkoutsPost;
