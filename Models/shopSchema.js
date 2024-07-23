import mongoose from "mongoose";

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
    image: {
        type: String,
        required: true
    },  
    location: {
        type: String,
        required: true
    },
    category: [{
        type: String,
        required: true 
    }],
    isDeleted: {    
        type: Boolean,
        default: false
    }
});

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;    
