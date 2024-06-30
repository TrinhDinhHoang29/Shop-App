import * as cloud from "../helpers/uploadCloud.helper";
import { Request,Response,NextFunction } from "express";
export const uploadSingle= async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
    if(req["file"]){   
        const link =await cloud.upload(req["file"].buffer);
        req.body[req["file"].fieldname] = link;
    }
    next();
}

export const uploadFields= async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
    if(req["files"].thumbnail){
        for(const thumbnail of req["files"].thumbnail){
            const linkImage =await cloud.upload(thumbnail.buffer);
            req.body[thumbnail.fieldname] = linkImage;
        }
    }
    if(req["files"].images){
        let images = [];
        for(const image of req["files"].images){
            const linkImage =await cloud.upload(image.buffer);
            images.push(linkImage);
        }
        req.body["images"]=images;
    }
    next();
}