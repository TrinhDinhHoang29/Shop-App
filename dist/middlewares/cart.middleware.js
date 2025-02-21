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
exports.cartsMiddleware = void 0;
const carts_model_1 = __importDefault(require("../models/carts.model"));
const cartsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.cartId) {
        const cart = new carts_model_1.default();
        yield cart.save();
        res.cookie("cartId", cart.id, { expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000) });
        cart.totalQuantity = 0;
        res.locals.cart = cart;
    }
    else {
        const cart = yield carts_model_1.default.findOne({ _id: req.cookies.cartId });
        cart.totalQuantity = cart.products.reduce((total, current) => total + current.quantity, 0);
        res.locals.cart = cart;
    }
    next();
});
exports.cartsMiddleware = cartsMiddleware;
