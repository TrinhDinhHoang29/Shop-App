"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valiCreate = void 0;
const valiCreate = (req, res, next) => {
    const { title, description, status } = req.body;
    if (!title.trim() || !description.trim() || !status.trim()) {
        req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
        res.redirect('back');
        return;
    }
    next();
};
exports.valiCreate = valiCreate;
