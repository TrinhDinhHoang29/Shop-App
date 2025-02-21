"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user_id: String,
    userInfo: {
        fullName: String,
        phone: String,
        address: String,
        email: String,
        note: String,
    },
    status: {
        type: String,
        default: "ordered"
    },
    products: [
        {
            product_id: String,
            quantity: Number,
            price: Number,
            discountPercentage: Number,
            reviews_id: String
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const orders = mongoose_1.default.model("orders", orderSchema, "orders");
exports.default = orders;
