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
Object.defineProperty(exports, "__esModule", { value: true });
exports.valiEdit = exports.valiCreate = void 0;
const valiCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, title, description, price, discountPercentage, stock, status, thumbnail, productCategoryId } = req.body;
    if (!type || !productCategoryId.trim() || !title.trim() || !description.trim() || !status.trim() || !thumbnail.trim() || parseInt(price) < 0 || parseFloat(discountPercentage) < 0 || parseInt(stock) < 0) {
        req["flash"]("error", "Thêm thất bại!!!");
        res.redirect("back");
        return;
    }
    next();
});
exports.valiCreate = valiCreate;
const valiEdit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, title, description, price, discountPercentage, stock, status, productCategoryId } = req.body;
    if (!type || !productCategoryId.trim() || !title.trim() || !description.trim() || !status.trim() || parseInt(price) < 0 || parseFloat(discountPercentage) < 0 || parseInt(stock) < 0) {
        req["flash"]("error", "Sửa hất bại!!!");
        res.redirect("back");
        return;
    }
    next();
});
exports.valiEdit = valiEdit;
