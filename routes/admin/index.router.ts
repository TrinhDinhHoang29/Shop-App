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

export default (app:Express)=>{
    app.use("/admin/home",authMiddleware.checkToken,homeRouter);
    app.use("/admin/accounts",authMiddleware.checkToken,accounts);
    app.use("/admin/auth",auth);
    app.use("/admin/profile",authMiddleware.checkToken,profile);
    app.use("/admin/roles",authMiddleware.checkToken,roles);
    app.use("/admin/otps",authMiddleware.checkToken,otps);
    app.use("/admin/product-categorys",authMiddleware.checkToken,productCategorys);
    app.use("/admin/products",authMiddleware.checkToken,prodcuts);
    app.use("/admin/orders",authMiddleware.checkToken,orderRouter);








}