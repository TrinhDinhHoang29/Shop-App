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
exports.changePasswordValid = exports.changeEmailValid = exports.valiEdit = exports.valiLogin = exports.valiCreate = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const isEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existsEmail = yield user_model_1.default.findOne({ email: email });
    if (existsEmail)
        return true;
    return false;
});
const valiCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password, rePassword } = req.body;
    const existsEmail = yield isEmail(email);
    if (!fullName.trim() || !email.trim() || !password.trim() || !rePassword.trim() || existsEmail) {
        req["flash"]("error", "Tạo tài khoản thất bại!!!");
        res.redirect("back");
        return;
    }
    if (password !== rePassword) {
        req["flash"]("error", "Tạo tài khoản thất bại!!!");
        res.redirect("back");
        return;
    }
    next();
});
exports.valiCreate = valiCreate;
const valiLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
        req["flash"]("error", "Không để trống thông tin !!!");
        res.redirect("back");
        return;
    }
    next();
});
exports.valiLogin = valiLogin;
const valiEdit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName } = req.body;
    if (!fullName.trim()) {
        req["flash"]("error", "Tạo tài khoản thất bại!!!");
        res.redirect("back");
        return;
    }
    next();
});
exports.valiEdit = valiEdit;
const changeEmailValid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    let existsEmail = yield isEmail(email);
    if (!email.trim() || !otp.trim() || existsEmail) {
        req["flash"]("error", "Cập nhật thất bại !!!");
        res.redirect("back");
        return;
    }
    next();
});
exports.changeEmailValid = changeEmailValid;
const changePasswordValid = (req, res, next) => {
    const { password, passwordNew, rePasswordNew } = req.body;
    if (!password.trim() || !passwordNew.trim() || !rePasswordNew.trim()) {
        req["flash"]("error", "Cập nhật thất bại !!!");
        res.redirect("back");
        return;
    }
    if (passwordNew !== rePasswordNew) {
        req["flash"]("error", "Cập nhật thất bại !!!");
        res.redirect("back");
        return;
    }
    next();
};
exports.changePasswordValid = changePasswordValid;
