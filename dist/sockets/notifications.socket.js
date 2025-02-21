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
exports.addNotification = void 0;
const formatNotifications_helper_1 = require("../helpers/formatNotifications.helper");
const notifications_model_1 = __importDefault(require("../models/notifications.model"));
const addNotification = (res, data) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = new notifications_model_1.default(data);
    yield notification.save();
    const notifications = yield (0, formatNotifications_helper_1.formatNotificationHelper)();
    res["io"].emit("SERVER_RETURN_NOTIFICATION", notifications);
});
exports.addNotification = addNotification;
