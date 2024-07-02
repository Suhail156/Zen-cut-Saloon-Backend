
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    haircut: {
        type: String,
        required: true
    },
    facial: {
        type: String,
        required: true
    },
    beard: {
        type: String,
        required: true
    }
});

const shopSchema = new mongoose.Schema({
    shopname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
       type:String,
       required:true
    },
    image: {
        type: String,
        required: true
    },  
    location:{
        type:String,
        required:true
    },

    category: [categorySchema],
    
    isDeleted:{
        type:Boolean,
        default:false
    },

});

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
