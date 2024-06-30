
import { Request,Response,NextFunction, RequestHandler } from "express";


export const valiCreate = (req:Request,res:Response,next:NextFunction):void=>{

    const {title,description,status} = req.body;
    if (!title.trim() || !description.trim() || !status.trim()) {
        req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
        res.redirect('back');
        return;
    }
    next();
}

// export const valiEdit = (req:Request,res:Response,next:NextFunction):void=>{

//     const {fullName,status} = req.body;
//     const trimmedfullName = fullName ? fullName.trim() : '';
//     const trimmedStatus = status ? status.trim() : '';
//     if (!trimmedfullName   || !trimmedStatus) {
//         req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
//         res.redirect('back');
//         return;
//     }
//     next();
// }

