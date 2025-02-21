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
const products_router_1 = __importDefault(require("./products.router"));
const categorys_router_1 = __importDefault(require("./categorys.router"));
const authMiddleware = __importStar(require("../../middlewares/auth.middleware"));
const cart_middleware_1 = require("../../middlewares/cart.middleware");
const carts_router_1 = __importDefault(require("./carts.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const profile_router_1 = __importDefault(require("./profile.router"));
const otp_router_1 = __importDefault(require("./otp.router"));
const checkout_router_1 = __importDefault(require("./checkout.router"));
const orders_router_1 = __importDefault(require("./orders.router"));
const reviews_router_1 = __importDefault(require("./reviews.router"));
const search_router_1 = __importDefault(require("./search.router"));
exports.default = (app) => {
    app.use(cart_middleware_1.cartsMiddleware);
    app.use(authMiddleware.existsTokenUser);
    app.use("/", home_router_1.default);
    app.use("/products", products_router_1.default);
    app.use("/categorys", categorys_router_1.default);
    app.use("/carts", carts_router_1.default);
    app.use("/checkouts", checkout_router_1.default);
    app.use("/", auth_router_1.default);
    app.use("/profile", authMiddleware.existsUserInfo, profile_router_1.default);
    app.use("/orders", authMiddleware.existsUserInfo, orders_router_1.default);
    app.use("/reviews", authMiddleware.existsUserInfo, reviews_router_1.default);
    app.use("/otps", otp_router_1.default);
    app.use("/search", search_router_1.default);
};
