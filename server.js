import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userrouter from "./Routes/userRoute.js";
import cors from "cors";
import shoprouter from "./Routes/OwnerShopRoute.js";
import shopOwner from "./Routes/shopOwnerRoute.js";
import usershop from "./Routes/userShopRoute.js";
import adminrouter from "./Routes/adminRoute.js";
import bookingrouter from "./Routes/bookingUser.js";
dotenv.config();
const app = express();

// app.use(cors("http://localhost:5173"));

// app.use(cors({
//     origin: 'https://zen-cut-saloon-frontend-qzug.vercel.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
//     allowedHeaders:['content-Type',"authorization"]
//   }));

app.use(cors({
  origin: [
    'https://zen-cut-saloon-frontend-qzug.vercel.app',
    'https://zen-cut-saloon-frontend-qzug-miizgl3iz.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true // Important if you're using cookies or auth headers
}));
//app.use(cors({
 //   origin: [
//        'https://zen-cut-saloon-frontend-qzug.vercel.app',
 //       'https://zen-cut-saloon-frontend-qzug-miizgl3iz.vercel.app'
 //   ],
 //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  //  allowedHeaders: ['Content-Type', 'Authorization']
//}));

mongoose
  .connect(process.env.db)
  .then(() => console.log("db connected"))
  .catch((error) => console.log(error));
//  middleware
app.use(express.json());

//routes for user
app.use("/api/users", userrouter);
// routes for shop detailes
app.use("/api/shop", shoprouter);
//routes for booking
app.use("/api/userbooking", bookingrouter);
//routes for shop owner
app.use("/api/shopowner", shopOwner);
//routes for user view shop
app.use("/api/usershop", usershop);
//routes for admin
app.use("/api/admin", adminrouter);
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port :${PORT}`);
});
