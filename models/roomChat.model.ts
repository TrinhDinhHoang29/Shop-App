import mongoose from "mongoose";
const roomChatSchema = new  mongoose.Schema({
    status:{
        type:String,
        default:"active"
    },
    user_id:String,
    deleted:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
});

const RoomChat= mongoose.model("roomChat",roomChatSchema,"roomChat");
export default  RoomChat;