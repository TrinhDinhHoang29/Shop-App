import express,{Express, Request,Response} from 'express';

import usersModel from '../../models/user.model';
export const index = async (req:Request,res:Response):Promise<void>=>{
    res.render("admin/pages/home/index",{});
}