import mongoose,{Schema} from "mongoose";

const rolesSchema:Schema = new mongoose.Schema({
    title:String,
    description:String,
    status:String,
    permissions:{
        type:Array,
        default:[]
    },
    deleted:{
        type:Boolean,
        default:false
    },
    createdBy:{
        id:String,
        createAt:{
            type:Date,
            default:Date.now
        }
    }
},{
    timestamps:true
});

const roles = mongoose.model("Roles",rolesSchema,"roles");
export default roles;