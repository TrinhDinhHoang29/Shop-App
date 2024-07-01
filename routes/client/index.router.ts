import express,{Express} from 'express';
import homeRouter from './home.router'

import * as authMiddleware from '../../middlewares/auth.middleware';
export default (app:Express)=>{
    app.use("/",homeRouter);
    // app.use("/topics",topicRouter);
    // app.use("/songs",songRouter);
    // app.use("/",authRouter);
    // app.use("/profile",authMiddleware.existsUserInfo,profileRouter);
    // app.use("/otps",otpRouter);
    // app.use("/search",searchRouter);
    // app.use("/favorites",authMiddleware.existsUserInfo,favoriteRouter);


}