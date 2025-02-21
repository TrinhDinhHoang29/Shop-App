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
exports.logOut = exports.loginPost = exports.login = void 0;
const account_model_1 = __importDefault(require("../../models/account.model"));
const md5_1 = __importDefault(require("md5"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/auth/login/index");
});
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield account_model_1.default.findOne({ deleted: false, email: req.body.email });
    if (!account) {
        req["flash"]("error", "Không tìm thấy tài khoản !!");
        res.redirect("back");
        return;
    }
    if (account.status === "inactive") {
        req["flash"]("error", "Tài khoản đã bị khoá !!");
        res.redirect("back");
        return;
    }
    if (account.password == (0, md5_1.default)(req.body.password)) {
        req["flash"]("success", "Đăng nhập thành công !!");
        res.cookie("token", account.token, { expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000) });
        res.redirect("/admin/home");
    }
    else {
        req["flash"]("error", "Sai mật khẩu!!");
        res.redirect("back");
    }
});
exports.loginPost = loginPost;
const logOut = (req, res) => {
    res.clearCookie("token");
    res.redirect("/admin/auth/login");
};
exports.logOut = logOut;
