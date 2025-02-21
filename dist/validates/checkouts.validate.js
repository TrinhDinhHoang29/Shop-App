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
exports.valiAdd = exports.valiCheckStock = void 0;
const products_model_1 = __importDefault(require("../models/products.model"));
const valiCheckStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productIds = res.locals.cart.products.map(item => item.product_id);
    const products = yield products_model_1.default.find({
        _id: {
            $in: productIds
        }
    }).select("stock");
    const check = products.filter(item => {
        const product = res.locals.cart.products.find(productCart => productCart.product_id == item.id);
        return product.quantity > item.stock;
    });
    if (check.length > 0) {
        req["flash"]("error", "Số lượng sản phẩm ở kho không đủ !!!");
        res.redirect("back");
    }
    else {
        next();
    }
});
exports.valiCheckStock = valiCheckStock;
const valiAdd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, tinh, quan, phuong, phone, email, orderNote } = req.body;
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim() || tinh === '0' || quan === '0' || phuong === '0') {
        req["flash"]("error", "Vui lòng nhập đủ thông tin !!!");
        res.redirect("back");
    }
    else {
        next();
    }
});
exports.valiAdd = valiAdd;
