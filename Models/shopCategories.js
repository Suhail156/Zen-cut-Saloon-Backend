import mongoose from "mongoose";

 const shopCategories=new mongoose.Schema({
    haircut:{
        type:String,
        required:true
    },
    facial:{
        type:String,
        required:true
    },
    beard:{
        type:String,
        required:true
    }
 })
 const Category=mongoose.model("Category",shopCategories)
 export default Category