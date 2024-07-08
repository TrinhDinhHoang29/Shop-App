import express,{Express, NextFunction, Request,Response} from 'express';
import categorysModel from '../../models/product-categorys.model';
import productsModel from '../../models/products.model';
import cartsModel from '../../models/carts.model';
import mongoose from 'mongoose';


export const index = async (req:Request,res:Response):Promise<void>=>{

    try{
        const productIds:any = res.locals.cart.products.map(item=>item.product_id);
        const products = await productsModel.find({_id:{$in:productIds}}).select("-images -stock -status -description").lean();
        
        products.forEach(product=>{
            const quantity =  res.locals.cart.products.find(item=>item.product_id==product._id).quantity;
            product.quantity = quantity;
        })
        res.render("client/pages/cart/index",{products:products});
    }catch(error){
        console.log("erro:"+error);
        res.send("Server error "+error);
    }
   
}
export const deleteProduct = async (req:Request,res:Response):Promise<void>=>{
    try{
        const product_id = req.params.product_id;
        const cart:any = await cartsModel.findOneAndUpdate({_id:req.cookies.cartId},{
            $pull:{
                products:{product_id:product_id}
            }
        },{
            new:true
        })
        
        const countProductsQuantity:number = cart.products.reduce((sum,current)=>sum+=current.quantity,0);
        res.json({
            code:200,
            quantity:countProductsQuantity
        })
    }catch(error){
        res.json({
            code:404
        })
    }

}
export const addToCart = async (req:Request,res:Response):Promise<void>=>{
    try{
        const product_id:string = req.params.product_id;
        const quantity:Number = parseInt(req.params.quantity);
        const objectCart:any = {
            product_id:product_id,
            quantity:quantity
        }
        const carts:any = await cartsModel.findOne({_id:req.cookies.cartId});
        const existProduct:any = carts.products.find(item=>item.product_id==product_id);
        if(existProduct){
            if(req.params.type!=="set")
                objectCart.quantity = existProduct.quantity+quantity;
            await cartsModel.findOneAndUpdate({_id:req.cookies.cartId,"products.product_id":product_id},{
                "$set":{
                    "products.$.quantity":objectCart.quantity
                }
            })
        }else{
            await cartsModel.findOneAndUpdate({_id:req.cookies.cartId},{
                $push:{products:objectCart}
            })
        }
        const recordCart:any = await cartsModel.findOne({_id:req.cookies.cartId});
        const countProductsQuantity:number = recordCart.products.reduce((sum,current)=>sum+=current.quantity,0);
        res.json({
            code:200,
            quantity:countProductsQuantity
        })
    }catch(error){
        console.log("da vao");
        res.json({code:404,mess:"error"});

    }

    
    
}
