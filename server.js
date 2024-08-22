import express from "express";
import mongoose  from "mongoose";
import dotenv from "dotenv";
import userrouter from './Routes/userRoute.js'
import cors from 'cors'
import shoprouter from './Routes/OwnerShopRoute.js'
import shopOwner from './Routes/shopOwnerRoute.js'
import usershop from './Routes/userShopRoute.js'
import adminrouter from './Routes/adminRoute.js'
import bookingrouter from './Routes/bookingUser.js'
 dotenv.config()
const app=express()
 
// app.use(cors({
//     // origin:"http://localhost:5173"
//   }));
  
const allowedOrigins = [
    'https://zen-cut-saloon-frontend-qzug-343y4okr3.vercel.app', // The current domain
    'https://zen-cut-saloon-frontend-qzug-20631t53s.vercel.app', // The other domain
    // Add more domains as needed
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) { // Allow requests with no origin (like from Postman)
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));
mongoose.connect(process.env.db)
.then(()=>console.log('db connected'))
.catch(error =>console.log(error))
//  middleware
app.use(express.json())

//routes for user
 app.use('/api/users',userrouter)
// routes for shop detailes
app.use('/api/shop',shoprouter)
//routes for booking
app.use('/api/userbooking',bookingrouter)
//routes for shop owner
app.use('/api/shopowner',shopOwner)
//routes for user view shop
app.use('/api/usershop',usershop)
//routes for admin 
app.use('/api/admin',adminrouter)
const PORT = process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})