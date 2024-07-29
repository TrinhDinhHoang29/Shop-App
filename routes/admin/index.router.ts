import express,{Express} from 'express';
import homeRouter from './home.router';
import accounts from './account.router';
import auth from './auth.router';
import * as authMiddleware from '../../middlewares/auth.middleware';
import profile from './profile.router';
import roles from './roles.router';
import otps from './otp.router';
import users from './users.router';
import prodcuts from './products.router';
import productCategorys from './product-categorys.router'
import orderRouter from './orders.router';
import { connectSocketAdmin } from '../../sockets/chat.socket';
export default (app:Express)=>{
    app.use("/admin/home",authMiddleware.checkToken,connectSocketAdmin,homeRouter);
    app.use("/admin/accounts",authMiddleware.checkToken,connectSocketAdmin,accounts);
    app.use("/admin/auth",auth);
    app.use("/admin/profile",authMiddleware.checkToken,connectSocketAdmin,profile);
    app.use("/admin/roles",authMiddleware.checkToken,connectSocketAdmin,roles);
    app.use("/admin/otps",authMiddleware.checkToken,connectSocketAdmin,otps);
    app.use("/admin/product-categorys",authMiddleware.checkToken,connectSocketAdmin,productCategorys);
    app.use("/admin/products",authMiddleware.checkToken,connectSocketAdmin,prodcuts);
    app.use("/admin/orders",authMiddleware.checkToken,connectSocketAdmin,orderRouter);








}