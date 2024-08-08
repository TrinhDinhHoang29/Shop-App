import mongoose from "mongoose";
const notificationsSchema = new  mongoose.Schema({
    user_id:String,
    type :String,
    type_id:String,
    is_read :{
        type:Boolean, 
        default:false
    },
    deleted:{
        type:Boolean, 
        default:false
    },
},{
    timestamps:true
});

const Notifications= mongoose.model("Notifications",notificationsSchema,"notifications");
export default Notifications;