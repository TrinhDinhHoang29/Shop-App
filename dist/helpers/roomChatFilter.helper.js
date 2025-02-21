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
exports.roomChatsFillter = void 0;
const roomChat_model_1 = __importDefault(require("../models/roomChat.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const chat_model_1 = __importDefault(require("../models/chat.model"));
const calculateTimeDifference_helper_1 = require("./calculateTimeDifference.helper");
const sortNewChats = (roomChats) => {
    const sortedChats = roomChats.sort((a, b) => {
        const dateA = new Date(a.messageEnd.createdAt);
        const dateB = new Date(b.messageEnd.createdAt);
        return dateB - dateA;
    });
    return sortedChats.slice(0, 6);
};
const roomChatsFillter = () => __awaiter(void 0, void 0, void 0, function* () {
    const roomChats = yield roomChat_model_1.default.find({ deleted: "false" }).lean();
    const users = yield user_model_1.default.find({}).select("-tokenUser -password ");
    for (const roomChat of roomChats) {
        roomChat.user = users.find(user => user.id == roomChat.user_id);
        const messageEnd = yield chat_model_1.default.find({ room_chat_id: roomChat._id }).sort({ createdAt: "desc" }).limit(1);
        if (messageEnd.length > 0) {
            messageEnd[0].timeDifference = (0, calculateTimeDifference_helper_1.calculateTimeDifference)(messageEnd[0].createdAt);
            roomChat.messageEnd = messageEnd[0];
        }
    }
    const roomChatsFillter = roomChats.filter((roomChat) => roomChat.messageEnd);
    return sortNewChats(roomChatsFillter);
});
exports.roomChatsFillter = roomChatsFillter;
