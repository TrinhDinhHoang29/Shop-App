"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewsSchema = new mongoose_1.default.Schema({
    product_id: String,
    user_id: String,
    rating: String,
    comment: String,
    images: Array
}, {
    timestamps: true
});
const reviews = mongoose_1.default.model("reviews", reviewsSchema, "reviews");
exports.default = reviews;
