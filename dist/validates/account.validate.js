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
exports.valiEdit = exports.valiCreate = void 0;
const account_model_1 = __importDefault(require("../models/account.model"));
const isEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existsEmail = yield account_model_1.default.findOne({ email: email });
    if (existsEmail)
        return true;
    return false;
});
const valiCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password, status } = req.body;
    const existsEmail = yield isEmail(email);
    if (!fullName.trim() || !email.trim() || !password.trim() || !status.trim() || existsEmail) {
        req["flash"]("error", "Thêm thất bại!!!");
        res.redirect("back");
        return;
    }
    next();
});
exports.valiCreate = valiCreate;
const valiEdit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, status } = req.body;
    let existsEmail = false;
    const id = req.params.id;
    const accountEmail = yield account_model_1.default.findOne({ _id: id, email: email });
    if (!accountEmail) {
        existsEmail = yield isEmail(email);
    }
    if (!fullName.trim() || !email.trim() || !status.trim() || existsEmail) {
        req["flash"]("error", "Sửa thất bại!!!");
        res.redirect("back");
        return;
    }
    next();
});
exports.valiEdit = valiEdit;
