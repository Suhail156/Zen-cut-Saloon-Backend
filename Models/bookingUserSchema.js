import mongoose from "mongoose";

const bookingUserSchema = new mongoose.Schema({
    startTime: {
        type: String,
        // required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shopId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    OwnerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "shopOwner",
        // required: true
    },
    phone: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date:{
        type:String,
        required:true
    }
});

const Booking = mongoose.model('Booking', bookingUserSchema); 
export default Booking;
