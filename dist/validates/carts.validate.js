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
exports.valiAdd = void 0;
const products_model_1 = __importDefault(require("../models/products.model"));
const valiAdd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const quantity = parseInt(req.params.quantity);
    const product = yield products_model_1.default.findOne({ _id: req.params.product_id });
    if (quantity > 0 && product) {
        next();
    }
    else {
        req["flash"]("error", "Thêm vào giỏ hàng thất bại !!");
        res.redirect("back");
        return;
    }
});
exports.valiAdd = valiAdd;
