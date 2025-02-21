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
exports.comfirmPasswordNewPatch = exports.comfirmPasswordNew = exports.forgotPassowrdPatch = exports.forgotPassowrd = exports.logOut = exports.registerPost = exports.register = exports.loginPatch = exports.login = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const otp_model_1 = __importDefault(require("../../models/otp.model"));
const md5_1 = __importDefault(require("md5"));
const roomChat_model_1 = __importDefault(require("../../models/roomChat.model"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/auth/login");
});
exports.login = login;
const loginPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ deleted: false, email: req.body.email });
    if (!user) {
        req["flash"]("error", "Không tìm thấy tài khoản !!");
        res.redirect("back");
        return;
    }
    if (user.status === "inactive") {
        req["flash"]("error", "Tài khoản đã bị khoá !!");
        res.redirect("back");
        return;
    }
    if (user.password == (0, md5_1.default)(req.body.password)) {
        req["flash"]("success", "Đăng nhập thành công !!");
        res.cookie("tokenUser", user.tokenUser, { expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000) });
        res.redirect("/");
    }
    else {
        req["flash"]("error", "Sai mật khẩu!!");
        res.redirect("back");
    }
});
exports.loginPatch = loginPatch;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/auth/register");
});
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userBody = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: (0, md5_1.default)(req.body.password)
        };
        const user = new user_model_1.default(userBody);
        yield user.save();
        const roomChat = new roomChat_model_1.default({
            user_id: user._id
        });
        yield roomChat.save();
        req["flash"]("success", "Tạo tài khoản thành công");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Tạo tài khoản thất bại");
        res.redirect("back");
    }
});
exports.registerPost = registerPost;
const logOut = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/login");
};
exports.logOut = logOut;
const forgotPassowrd = (req, res) => {
    res.render("client/pages/auth/forgot-password");
};
exports.forgotPassowrd = forgotPassowrd;
const forgotPassowrdPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isOTP = yield otp_model_1.default.findOne({
        otp: req.body.otp,
        email: req.body.email
    });
    if (isOTP) {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        res.cookie("tokenUser", user.tokenUser, { expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000) });
        yield otp_model_1.default.deleteOne({ otp: req.body.otp });
        res.redirect("/comfirm-password-new");
    }
    else {
        req["flash"]("error", "Không thành công !!");
        res.redirect("back");
    }
});
exports.forgotPassowrdPatch = forgotPassowrdPatch;
const comfirmPasswordNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/auth/comfirm-password-new");
});
exports.comfirmPasswordNew = comfirmPasswordNew;
const comfirmPasswordNewPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password === req.body.rePassword) {
        try {
            yield user_model_1.default.updateOne({
                email: res.locals.userInfo.email
            }, {
                password: (0, md5_1.default)(req.body.password)
            });
            res.redirect("/home");
        }
        catch (error) {
            console.log(error);
            res.send("Server error !!");
        }
    }
    else {
        req["flash"]("error", "Mật khẩu không khớp !!");
        res.redirect("back");
    }
});
exports.comfirmPasswordNewPatch = comfirmPasswordNewPatch;
