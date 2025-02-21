"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeCategorys = void 0;
const treeCategorys = (arr, parentId = '') => {
    const tree = [];
    arr.forEach(item => {
        if (item.parentId === parentId) {
            const newItem = item;
            const childItem = (0, exports.treeCategorys)(arr, item.id);
            if (childItem.length > 0) {
                newItem.childItem = childItem;
            }
            tree.push(newItem);
        }
    });
    return tree;
};
exports.treeCategorys = treeCategorys;
