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
exports.changeEmailPatch = exports.changeEmail = exports.changePasswordPatch = exports.changePassword = exports.indexPatch = exports.index = void 0;
const account_model_1 = __importDefault(require("../../models/account.model"));
const otp_model_1 = __importDefault(require("../../models/otp.model"));
const md5_1 = __importDefault(require("md5"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/profile/index");
});
exports.index = index;
const indexPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profileBody = {
        fullName: req.body.fullName,
        avatar: req.body.avatar
    };
    try {
        yield account_model_1.default.updateOne({ _id: res.locals.account.id }, profileBody);
        req["flash"]("success", "Cập nhật thành công !!!");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Cập nhật thất bại !!!");
        res.redirect("back");
    }
});
exports.indexPatch = indexPatch;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/profile/change-password");
});
exports.changePassword = changePassword;
const changePasswordPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, passwordNew } = req.body;
    const idAccount = res.locals.account.id;
    const account = yield account_model_1.default.findOne({ _id: idAccount }).select("password");
    if ((0, md5_1.default)(password) !== account.password) {
        req["flash"]("error", "Cập nhật thất bại !!!");
        res.redirect("back");
        return;
    }
    yield account_model_1.default.updateOne({ _id: idAccount }, { password: (0, md5_1.default)(passwordNew) });
    req["flash"]("success", "Cập nhật thành công !!!");
    res.redirect("back");
});
exports.changePasswordPatch = changePasswordPatch;
const changeEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/profile/change-email");
});
exports.changeEmail = changeEmail;
const changeEmailPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = yield otp_model_1.default.findOne({ email: res.locals.account.email, otp: req.body.otp });
    if (!otp) {
        req["flash"]("error", "Cập nhật thất bại!!!");
        res.redirect("back");
    }
    else {
        yield account_model_1.default.updateOne({ email: res.locals.account.email }, {
            email: req.body.email
        });
        yield otp_model_1.default.deleteOne({ otp: req.body.otp });
        req["flash"]("success", "Cập nhật thành công !!!");
        res.redirect("/admin/profile");
    }
});
exports.changeEmailPatch = changeEmailPatch;
