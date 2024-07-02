import express from "express";
import mongoose  from "mongoose";
import dotenv from "dotenv";
import userrouter from './Routes/userRoute.js'
import cors from 'cors'
import shoprouter from './Routes/shopRoute.js'
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
const PORT = process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})