"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const productSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    productCategoryId: String,
    thumbnail: String,
    status: String,
    images: Array,
    posision: Number,
    type: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        id: String,
        deleteAt: Date
    },
    createdBy: {
        id: String,
        createAt: {
            type: Date,
            default: Date.now
        }
    }
}, {
    timestamps: true
});
const products = mongoose_1.default.model("products", productSchema, "products");
exports.default = products;
