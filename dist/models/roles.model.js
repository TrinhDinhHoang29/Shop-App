"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rolesSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    status: String,
    permissions: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
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
const roles = mongoose_1.default.model("Roles", rolesSchema, "roles");
exports.default = roles;
