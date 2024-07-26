import mongoose from "mongoose";


const bookingUser=new mongoose.Schema({
    startTime:{
        type:Number,
        required:true
    },
    endTime:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    ShopId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop",
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
})
const Booking=mongoose.model('booking',bookingUser)
export default Booking