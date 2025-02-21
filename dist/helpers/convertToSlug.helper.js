"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unidecode_1 = __importDefault(require("unidecode"));
exports.default = (text) => {
    return (0, unidecode_1.default)(text.toLocaleLowerCase()).trim().replace(/\s+/g, "-");
};
