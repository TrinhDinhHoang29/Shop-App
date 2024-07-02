import express,{Express} from 'express';
import homeRouter from './home.router'
import productRouter from './products.router'
import categoryRouter from './categorys.router';
import * as authMiddleware from '../../middlewares/auth.middleware';
export default (app:Express)=>{
    app.use(authMiddleware.existsTokenUser);
    app.use("/",homeRouter);
    app.use("/products",productRouter);
    app.use("/categorys",categoryRouter);
    // app.use("/",authRouter);
    // app.use("/profile",authMiddleware.existsUserInfo,profileRouter);
    // app.use("/otps",otpRouter);
    // app.use("/search",searchRouter);
    // app.use("/favorites",authMiddleware.existsUserInfo,favoriteRouter);


}