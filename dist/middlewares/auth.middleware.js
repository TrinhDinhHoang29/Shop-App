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
exports.existsOrder = exports.existsUserInfo = exports.existsTokenUser = exports.checkToken = void 0;
const account_model_1 = __importDefault(require("../models/account.model"));
const roles_model_1 = __importDefault(require("../models/roles.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const product_categorys_model_1 = __importDefault(require("../models/product-categorys.model"));
const treeCategorys_helper_1 = require("../helpers/treeCategorys.helper");
const carts_model_1 = __importDefault(require("../models/carts.model"));
const orders_models_1 = __importDefault(require("../models/orders.models"));
const roomChat_model_1 = __importDefault(require("../models/roomChat.model"));
const chat_model_1 = __importDefault(require("../models/chat.model"));
const convertDate_helper_1 = require("../helpers/convertDate.helper");
const roomChatFilter_helper_1 = require("../helpers/roomChatFilter.helper");
const formatNotifications_helper_1 = require("../helpers/formatNotifications.helper");
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.token) {
        res.redirect("/admin/auth/login");
        return;
    }
    const account = yield account_model_1.default.findOne({ deleted: false, token: req.cookies.token }).select("-password");
    if (!account) {
        res.redirect("/admin/auth/login");
        return;
    }
    res.locals.account = account;
    res.locals.role = yield roles_model_1.default.findOne({ _id: account.roleId, deleted: false });
    res.locals.roomChats = yield (0, roomChatFilter_helper_1.roomChatsFillter)();
    res.locals.notifications = yield (0, formatNotifications_helper_1.formatNotificationHelper)();
    next();
});
exports.checkToken = checkToken;
const existsTokenUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.tokenUser) {
        const user = yield user_model_1.default.findOne({ deleted: false, status: "active", tokenUser: req.cookies.tokenUser }).select("-password");
        if (user) {
            res.locals.userInfo = user;
            const cart = yield carts_model_1.default.findOne({ user_id: user.id });
            if (cart) {
                res.cookie("cartId", cart.id, { expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000) });
                cart.totalQuantity = cart.products.reduce((total, current) => total + current.quantity, 0);
                res.locals.cart = cart;
            }
            else {
                yield carts_model_1.default.updateOne({ _id: res.locals.cart.id }, { user_id: user.id });
            }
            const roomChat = yield roomChat_model_1.default.findOne({ user_id: user.id });
            const chats = yield chat_model_1.default.find({ room_chat_id: roomChat.id }).lean();
            res.locals.chats = (0, convertDate_helper_1.convertDate)(chats);
        }
    }
    const categorysHeader = yield product_categorys_model_1.default.find({ status: "active", deleted: false });
    const formatCategorysHeader = (0, treeCategorys_helper_1.treeCategorys)(categorysHeader);
    res.locals.categorysHeader = formatCategorysHeader;
    next();
});
exports.existsTokenUser = existsTokenUser;
const existsUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.userInfo) {
        next();
    }
    else {
        res.redirect("/login");
    }
});
exports.existsUserInfo = existsUserInfo;
const existsOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const order = yield orders_models_1.default.findOne({ _id: orderId, user_id: res.locals.userInfo.id });
    if (order)
        next();
    else
        res.redirect("back");
});
exports.existsOrder = existsOrder;
