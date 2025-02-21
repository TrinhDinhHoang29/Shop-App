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
exports.changePasswordPatch = exports.changePassword = exports.changeEmailPatch = exports.changeEmail = exports.updateProfile = exports.index = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const otp_model_1 = __importDefault(require("../../models/otp.model"));
const orders_models_1 = __importDefault(require("../../models/orders.models"));
const md5_1 = __importDefault(require("md5"));
const chat_socket_1 = require("../../sockets/chat.socket");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orders_models_1.default.find({
        status: {
            $ne: "cancel"
        },
        deleted: false,
        user_id: res.locals.userInfo.id
    });
    res.render("client/pages/profile/index", { orders: orders });
    (0, chat_socket_1.chatSocket)(res);
});
exports.index = index;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileBody = {
            fullName: req.body.fullName,
            avatar: req.body.avatar
        };
        yield user_model_1.default.updateOne({
            _id: res.locals.userInfo._id
        }, profileBody);
        req["flash"]("success", "Cập nhật thành công");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Cập nhật thất bại");
        res.redirect("back");
    }
});
exports.updateProfile = updateProfile;
const changeEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/profile/change-email");
    (0, chat_socket_1.chatSocket)(res);
});
exports.changeEmail = changeEmail;
const changeEmailPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = yield otp_model_1.default.findOne({ email: res.locals.userInfo.email, otp: req.body.otp });
    if (!otp) {
        req["flash"]("error", "Cập nhật thất bại!!!");
        res.redirect("back");
    }
    else {
        yield user_model_1.default.updateOne({ email: res.locals.userInfo.email }, {
            email: req.body.email
        });
        yield otp_model_1.default.deleteOne({ otp: req.body.otp });
        req["flash"]("success", "Cập nhật thành công !!!");
        res.redirect("/profile");
    }
});
exports.changeEmailPatch = changeEmailPatch;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/profile/change-password");
    (0, chat_socket_1.chatSocket)(res);
});
exports.changePassword = changePassword;
const changePasswordPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, passwordNew } = req.body;
    const idUser = res.locals.userInfo._id;
    const user = yield user_model_1.default.findOne({ _id: idUser }).select("password");
    if ((0, md5_1.default)(password) !== user.password) {
        req["flash"]("error", "Cập nhật thất bại !!!");
        res.redirect("back");
        return;
    }
    yield user_model_1.default.updateOne({ _id: idUser }, { password: (0, md5_1.default)(passwordNew) });
    req["flash"]("success", "Cập nhật thành công !!!");
    res.redirect("back");
});
exports.changePasswordPatch = changePasswordPatch;
