import express,{Express, NextFunction, Request,Response} from 'express';
import productsModel from '../../models/products.model';
import ordersModel from '../../models/orders.models';
import carts from '../../models/carts.model';


export const index = async (req:Request,res:Response):Promise<void>=>{

    try{
        const productIds:any = res.locals.cart.products.map(item=>item.product_id);
        const products:any = await productsModel.find({_id:{$in:productIds}}).select("title price discountPercentage").lean();
        
        products.forEach(product=>{
            const quantity =  res.locals.cart.products.find(item=>item.product_id==product._id).quantity;
            product.quantity = quantity;
        })
        products.totalPrice = products.reduce((total,current)=>{
            const price:any = (current.price - (current.price*current.discountPercentage/100))*current.quantity;
            return total+=parseFloat(price);
        },0);
       res.render("client/pages/checkouts/index",{products:products});
    }catch(error){
       
    }
   
}
export const checkoutsPost = async (req:Request,res:Response):Promise<void>=>{

    try{
        const productOrderIds = res.locals.cart.products.map(item=>item.product_id);
        const products = await productsModel.find({
            _id:{
                $in:productOrderIds
            }
        }).select("id price discountPercentage");
        const productsOder:any = res.locals.cart.products.map(item=>{
            const productOder = products.find(product=>product.id ==item.product_id);
            return {
                product_id:item.product_id,
                quantity:item.quantity,
                price:productOder.price,
                discountPercentage:productOder.discountPercentage
            };
        })
        const orderBody = {
            user_id:res.locals.userInfo.id,
            userInfo:{
                fullName:`${req.body.firstName} ${req.body.lastName}`,
                phone:req.body.phone,
                address:`${req.body.phuong},${req.body.quan},${req.body.tinh}`,
                email:req.body.email,
                note:req.body.orderNote,
            },
            products:productsOder
        }
        const order = new ordersModel(orderBody);
        await order.save();
        await carts.updateOne({
            _id:req.cookies.cartId
        },{
            $pull:{
                products:{
                    product_id:{
                        $in:productOrderIds
                    }          
                }
            }
        })
        req["flash"]("success","Đặt thành công !!");
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Đặt thất bại!!");
        res.redirect("back");
    }
   
} 
