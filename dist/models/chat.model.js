"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    user_id: String,
    content: String,
    room_chat_id: String,
    images: Array,
    type_send: String,
    deleted: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const Chat = mongoose_1.default.model("chat", chatSchema, "chats");
exports.default = Chat;
