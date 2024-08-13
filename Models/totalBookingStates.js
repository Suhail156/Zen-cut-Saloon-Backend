import mongoose from "mongoose";


const bookingStatsSchema= new mongoose.Schema({
    totalusers:{
        type:Number},
    totalowners:{
        type:Number
     
    },
    totalBookings:{
        type:Number
    },
})
const bookingStats=mongoose.model("bookingStats",bookingStatsSchema)
export default bookingStats