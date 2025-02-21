"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValid = void 0;
const loginValid = (req, res, next) => {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
        req["flash"]("error", "Đăng nhập thất bại");
        res.redirect("back");
        return;
    }
    next();
};
exports.loginValid = loginValid;
