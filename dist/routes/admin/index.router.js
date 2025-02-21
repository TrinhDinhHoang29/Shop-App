"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_router_1 = __importDefault(require("./home.router"));
const account_router_1 = __importDefault(require("./account.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const authMiddleware = __importStar(require("../../middlewares/auth.middleware"));
const profile_router_1 = __importDefault(require("./profile.router"));
const roles_router_1 = __importDefault(require("./roles.router"));
const otp_router_1 = __importDefault(require("./otp.router"));
const products_router_1 = __importDefault(require("./products.router"));
const product_categorys_router_1 = __importDefault(require("./product-categorys.router"));
const orders_router_1 = __importDefault(require("./orders.router"));
const chat_socket_1 = require("../../sockets/chat.socket");
const chat_router_1 = __importDefault(require("./chat.router"));
const notification_router_1 = __importDefault(require("./notification.router"));
exports.default = (app) => {
    app.use("/admin/home", authMiddleware.checkToken, chat_socket_1.connectSocketAdmin, home_router_1.default);
    app.use("/admin/accounts", authMiddleware.checkToken, chat_socket_1.connectSocketAdmin, account_router_1.default);
    app.use("/admin/auth", auth_router_1.default);
    app.use("/admin/profile", authMiddleware.checkToken, chat_socket_1.connectSocketAdmin, profile_router_1.default);
    app.use("/admin/roles", authMiddleware.checkToken, chat_socket_1.connectSocketAdmin, roles_router_1.default);
    app.use("/admin/otps", authMiddleware.checkToken, chat_socket_1.connectSocketAdmin, otp_router_1.default);
    app.use("/admin/product-categorys", authMiddleware.checkToken, chat_socket_1.connectSocketAdmin, product_categorys_router_1.default);
    app.use("/admin/products", authMiddleware.checkToken, chat_socket_1.connectSocketAdmin, products_router_1.default);
    app.use("/admin/orders", authMiddleware.checkToken, chat_socket_1.connectSocketAdmin, orders_router_1.default);
    app.use("/admin/chats", authMiddleware.checkToken, chat_socket_1.connectSocketAdmin, chat_router_1.default);
    app.use("/admin/notifications", authMiddleware.checkToken, chat_socket_1.connectSocketAdmin, notification_router_1.default);
};
