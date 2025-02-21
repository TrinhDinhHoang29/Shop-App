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
exports.formatNotificationHelper = void 0;
const notifications_model_1 = __importDefault(require("../models/notifications.model"));
const calculateTimeDifference_helper_1 = require("./calculateTimeDifference.helper");
const user_model_1 = __importDefault(require("../models/user.model"));
const formatNotificationHelper = () => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield notifications_model_1.default.find({ deleted: false }).sort({ createdAt: "desc" }).limit(6).lean();
    for (const notification of notifications) {
        notification.timeDifference = (0, calculateTimeDifference_helper_1.calculateTimeDifference)(notification.createdAt);
        const user = yield user_model_1.default.findOne({ _id: notification.user_id }).select("fullName");
        notification.fullName = user.fullName;
    }
    return notifications;
});
exports.formatNotificationHelper = formatNotificationHelper;
