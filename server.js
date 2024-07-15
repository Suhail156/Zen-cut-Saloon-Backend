import express from "express";
import mongoose  from "mongoose";
import dotenv from "dotenv";
import userrouter from './Routes/userRoute.js'
import cors from 'cors'
import shoprouter from './Routes/OwnerShopRoute.js'
import shopOwner from './Routes/shopOwnerRoute.js'
import usershop from './Routes/userShopRoute.js'
 dotenv.config()
const app=express()
 
app.use(cors())
mongoose.connect(process.env.db)
.then(()=>console.log('db connected'))
.catch(error =>console.log(error,"dfghj"))
//  middleware
app.use(express.json())

//routes for user
 app.use('/api/users',userrouter)
// routes for shop detailes
app.use('/api/shop',shoprouter)
//routes for shop owner
app.use('/api/shopowner',shopOwner)
//routes for user view shop
app.use('/api/usershop',usershop)
const PORT = process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})