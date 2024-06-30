// import express,{Express} from 'express';
// import topicRouter from './topics.router';
// import homeRouter from './home.router';
// import songRouter from './songs.router';
// import authRouter from './auth.router';
// import profileRouter from './profile.router';
// import otpRouter from './otp.router';
// import searchRouter from './search.router';
// import favoriteRouter from './favorite.router';

// import * as authMiddleware from '../../middlewares/auth.middleware';
// export default (app:Express)=>{
//     app.use(authMiddleware.existsTokenUser);
//     app.use("/home",homeRouter);
//     app.use("/topics",topicRouter);
//     app.use("/songs",songRouter);
//     app.use("/",authRouter);
//     app.use("/profile",authMiddleware.existsUserInfo,profileRouter);
//     app.use("/otps",otpRouter);
//     app.use("/search",searchRouter);
//     app.use("/favorites",authMiddleware.existsUserInfo,favoriteRouter);


// }