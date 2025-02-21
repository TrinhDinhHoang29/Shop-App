"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidSort = exports.isValidLimiteItem = void 0;
const isValidLimiteItem = (value) => {
    return value === "4" || value === "6" || value === "10";
};
exports.isValidLimiteItem = isValidLimiteItem;
const isValidSort = (value) => {
    return value === "asc" || value === "desc";
};
exports.isValidSort = isValidSort;
