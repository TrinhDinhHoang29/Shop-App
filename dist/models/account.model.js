"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
const random_token_1 = __importDefault(require("random-token"));
const randomToken = random_token_1.default.create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const accountSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    password: String,
    status: String,
    roleId: String,
    avatar: String,
    token: {
        type: String,
        default: randomToken(20)
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
}, {
    timestamps: true
});
const accounts = mongoose_1.default.model("Accounts", accountSchema, "accounts");
exports.default = accounts;
