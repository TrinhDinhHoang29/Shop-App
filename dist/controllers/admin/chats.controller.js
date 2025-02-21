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
exports.index = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const chat_model_1 = __importDefault(require("../../models/chat.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomChatId = req.params.room_id;
    const chats = yield chat_model_1.default.find({ room_chat_id: roomChatId, deleted: false });
    const users = yield user_model_1.default.find({ deleted: false });
    chats.forEach(element => {
        const user = users.find(item => item._id == element.user_id);
        if (user)
            element.fullName = user.fullName;
    });
    res.render("admin/pages/chat/index", { chats: chats, roomChatId: roomChatId });
});
exports.index = index;
