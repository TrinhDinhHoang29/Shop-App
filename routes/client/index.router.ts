import express,{Express} from 'express';
import homeRouter from './home.router'
import productRouter from './products.router'
import categoryRouter from './categorys.router';
import * as authMiddleware from '../../middlewares/auth.middleware';
import { cartsMiddleware } from '../../middlewares/cart.middleware';
import cartsRouter from './carts.router';
export default (app:Express)=>{

    app.use(cartsMiddleware,authMiddleware.existsTokenUser);
    app.use("/",homeRouter);
    app.use("/products",productRouter);
    app.use("/categorys",categoryRouter);
    app.use("/carts",cartsRouter);

    // app.use("/",authRouter);
    // app.use("/profile",authMiddleware.existsUserInfo,profileRouter);
    // app.use("/otps",otpRouter);
    // app.use("/search",searchRouter);
    // app.use("/favorites",authMiddleware.existsUserInfo,favoriteRouter);


}