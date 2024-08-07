import mongoose from "mongoose";
const chatSchema = new  mongoose.Schema({
    user_id:String,
    content:String,
    room_chat_id:String,
    images:Array,
    type_send:String,
    deleted:{
        type:Boolean, 
        default:false
    },
    read:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

const Chat= mongoose.model("chat",chatSchema,"chats");
export default Chat;