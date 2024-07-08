import express,{Express} from 'express';
import homeRouter from './home.router'
import productRouter from './products.router'
import categoryRouter from './categorys.router';
import * as authMiddleware from '../../middlewares/auth.middleware';
import { cartsMiddleware } from '../../middlewares/cart.middleware';
import cartsRouter from './carts.router';
import authRouter from './auth.router';
import profileRouter from './profile.router';
import otpRouter from './otp.router';
import checkoutRouter from './checkout.router';
export default (app:Express)=>{
    app.use(cartsMiddleware)
    app.use(authMiddleware.existsTokenUser);
    app.use("/",homeRouter);
    app.use("/products",productRouter);
    app.use("/categorys",categoryRouter);
    app.use("/carts",cartsRouter);
    app.use("/checkouts",checkoutRouter);
    app.use("/",authRouter);
    app.use("/profile",authMiddleware.existsUserInfo,profileRouter);
    app.use("/otps",otpRouter);
    // app.use("/search",searchRouter);
    // app.use("/favorites",authMiddleware.existsUserInfo,favoriteRouter);


}