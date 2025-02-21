"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationsSchema = new mongoose_1.default.Schema({
    user_id: String,
    type: String,
    type_id: String,
    is_read: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
const Notifications = mongoose_1.default.model("Notifications", notificationsSchema, "notifications");
exports.default = Notifications;
