import mongoose from "mongoose";

 const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    // image:{
    //     type:String,
    //     required:true
    // },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true

    },
    
    accountCreatedDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    booking:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    }]
 })
 const User=mongoose.model("User",userSchema)
 export default User