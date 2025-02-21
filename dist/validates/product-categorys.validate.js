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
    const { title, status, description, thumbnail } = req.body;
    if (!title.trim() || !description.trim() || !status.trim() || !thumbnail) {
        req["flash"]("error", "Thêm thất bại!!!");
        res.redirect("back");
        return;
    }
    next();
});
exports.valiCreate = valiCreate;
const valiEdit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, status, description } = req.body;
    console.log(title, status, description);
    if (!title.trim() || !description.trim() || !status.trim()) {
        req["flash"]("error", "Cập nhật thất bại!!!");
        res.redirect("back");
        return;
    }
    next();
});
exports.valiEdit = valiEdit;
