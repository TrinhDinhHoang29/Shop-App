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
exports.connectSocketAdmin = exports.chatSocket = void 0;
const roomChatFilter_helper_1 = require("../helpers/roomChatFilter.helper");
const chat_model_1 = __importDefault(require("../models/chat.model"));
const roomChat_model_1 = __importDefault(require("../models/roomChat.model"));
const calculateTimeDifference_helper_1 = require("../helpers/calculateTimeDifference.helper");
const uploadCloud = __importStar(require("../helpers/uploadCloud.helper"));
const chatSocket = (res) => {
    res["io"].once('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        if (res.locals.userInfo) {
            const roomChat = yield roomChat_model_1.default.findOne({ user_id: res.locals.userInfo._id });
            console.log("client connect" + roomChat.id);
            socket.join(roomChat.id);
            socket.on('CLIENT_SEND_MESSAGE', (data) => __awaiter(void 0, void 0, void 0, function* () {
                const images = [];
                for (const image of data.images) {
                    const link = yield uploadCloud.upload(image);
                    images.push(link);
                }
                const objMSG = {
                    user_id: res.locals.userInfo._id,
                    room_chat_id: roomChat.id,
                    content: data.content,
                    type_send: "user",
                    images: images
                };
                const chat = new chat_model_1.default(objMSG);
                yield chat.save();
                const date = new Date(chat.createdAt);
                objMSG.date = `${date.getHours()}:${date.getMinutes()}`;
                const roomChats = yield (0, roomChatFilter_helper_1.roomChatsFillter)();
                roomChats.forEach(element => {
                    element.timeDifference = (0, calculateTimeDifference_helper_1.calculateTimeDifference)(element.messageEnd.createdAt);
                });
                objMSG.fullName = res.locals.userInfo.fullName;
                res["io"].to(roomChat.id).emit("SERVER_RETURN_MESSAGE", objMSG);
                res["io"].to(roomChat.id).emit("SERVER_RETURN_ANNOUNCEMENT", roomChats);
            }));
        }
    }));
};
exports.chatSocket = chatSocket;
const connectSocketAdmin = (req, res, next) => {
    res["io"].once('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        if (res.locals.account) {
            console.log("server connect");
            const roomChats = yield roomChat_model_1.default.find({ status: "active" });
            for (const roomChat of roomChats) {
                socket.join(roomChat.id);
            }
        }
        socket.on("SERVER_SEND_MESSAGE", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const images = [];
            for (const image of data.images) {
                const link = yield uploadCloud.upload(image);
                images.push(link);
            }
            const objMSG = {
                user_id: res.locals.account._id,
                room_chat_id: req.params.room_id,
                content: data.content,
                images: images,
                type_send: "admin"
            };
            const chat = new chat_model_1.default(objMSG);
            yield chat.save();
            yield chat_model_1.default.updateOne({ _id: chat.id }, { read: true });
            const date = new Date(chat.createdAt);
            objMSG.date = `${date.getHours()}:${date.getMinutes()}`;
            objMSG.fullName = res.locals.account.fullName;
            res["io"].to(req.params.room_id).emit("SERVER_RETURN_MESSAGE", objMSG);
        }));
    }));
    next();
};
exports.connectSocketAdmin = connectSocketAdmin;
