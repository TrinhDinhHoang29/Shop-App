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
exports.createForgotPassword = exports.create = void 0;
const sendOtp_helper_1 = __importDefault(require("../../helpers/sendOtp.helper"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.userInfo) {
        yield (0, sendOtp_helper_1.default)(req, res, res.locals.userInfo.email);
    }
});
exports.create = create;
const createForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmail = yield user_model_1.default.findOne({ email: req.body.email });
    if (isEmail) {
        yield (0, sendOtp_helper_1.default)(req, res, req.body.email);
    }
    else {
        res.json({
            code: 404,
            mess: "Send otp error !!"
        });
    }
});
exports.createForgotPassword = createForgotPassword;
