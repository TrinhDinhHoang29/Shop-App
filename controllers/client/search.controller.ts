
import express,{Express, Request,Response} from 'express';
import songsModel from '../../models/song.model';
import singersModel from '../../models/singer.model';
import conVertToSlug from '../../helpers/convertToSlug.helper';


export const index = async (req:Request,res:Response):Promise<void>=>{
    const keyword:string = req.query.keyword as string;
    const songs = await songsModel.find({status:"active",deleted:false,slug:new RegExp(conVertToSlug(keyword))});
    res.render("client/pages/searchs/index",{songs:songs});
}


export const suggestFindMusic = async (req:Request,res:Response):Promise<void>=>{
    const keyWord:string = req.query.keyword as string;
    const singers = await singersModel.find({});
    const songs = await songsModel.find({slug: new RegExp(conVertToSlug(keyWord))}).select("title slug avatar singerId").lean().limit(6);
 
    songs.forEach(song=>{
        const singer = singers.find(singer=>singer._id==song.singerId);
        song.fullNameSinger = singer.fullName;
    })
    res.json({
        code:200,
        data:songs
     })
     //    if(songs.length>0){
    //     res.json({
    //         code:200,
    //         data:songs
    //     })
    // }else{
    //     res.json({
    //         code:404,
    //         data:"Không tìm thấy"
    //     })
    // }
    
}