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
exports.addToCart = exports.deleteProduct = exports.index = void 0;
const products_model_1 = __importDefault(require("../../models/products.model"));
const carts_model_1 = __importDefault(require("../../models/carts.model"));
const chat_socket_1 = require("../../sockets/chat.socket");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productIds = res.locals.cart.products.map(item => item.product_id);
        const products = yield products_model_1.default.find({ _id: { $in: productIds } }).select("-images -stock -status -description").lean();
        products.forEach(product => {
            const quantity = res.locals.cart.products.find(item => item.product_id == product._id).quantity;
            product.quantity = quantity;
        });
        res.render("client/pages/cart/index", { products: products });
    }
    catch (error) {
        console.log("erro:" + error);
        res.send("Server error " + error);
    }
    (0, chat_socket_1.chatSocket)(res);
});
exports.index = index;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.product_id;
        const cart = yield carts_model_1.default.findOneAndUpdate({ _id: req.cookies.cartId }, {
            $pull: {
                products: { product_id: product_id }
            }
        }, {
            new: true
        });
        const countProductsQuantity = cart.products.reduce((sum, current) => sum += current.quantity, 0);
        res.json({
            code: 200,
            quantity: countProductsQuantity
        });
    }
    catch (error) {
        res.json({
            code: 404
        });
    }
});
exports.deleteProduct = deleteProduct;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.product_id;
        const quantity = parseInt(req.params.quantity);
        const objectCart = {
            product_id: product_id,
            quantity: quantity
        };
        const carts = yield carts_model_1.default.findOne({ _id: req.cookies.cartId });
        const existProduct = carts.products.find(item => item.product_id == product_id);
        if (existProduct) {
            if (req.params.type !== "set")
                objectCart.quantity = existProduct.quantity + quantity;
            yield carts_model_1.default.findOneAndUpdate({ _id: req.cookies.cartId, "products.product_id": product_id }, {
                "$set": {
                    "products.$.quantity": objectCart.quantity
                }
            });
        }
        else {
            yield carts_model_1.default.findOneAndUpdate({ _id: req.cookies.cartId }, {
                $push: { products: objectCart }
            });
        }
        const recordCart = yield carts_model_1.default.findOne({ _id: req.cookies.cartId });
        const countProductsQuantity = recordCart.products.reduce((sum, current) => sum += current.quantity, 0);
        res.json({
            code: 200,
            quantity: countProductsQuantity
        });
    }
    catch (error) {
        console.log("da vao");
        res.json({ code: 404, mess: "error" });
    }
});
exports.addToCart = addToCart;
