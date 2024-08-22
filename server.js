import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import userrouter from './Routes/userRoute.js';
import shoprouter from './Routes/OwnerShopRoute.js';
import shopOwner from './Routes/shopOwnerRoute.js';
import usershop from './Routes/userShopRoute.js';
import adminrouter from './Routes/adminRoute.js';
import bookingrouter from './Routes/bookingUser.js';

dotenv.config();
const app = express();

// Uncomment and configure CORS if running locally
// app.use(cors({
//     // origin: "http://localhost:5173"
// }));

// Allowed origins
const allowedOrigins = [
    'https://zen-cut-saloon-frontend-qzug-343y4okr3.vercel.app', // The current domain
    'https://zen-cut-saloon-frontend-qzug-20631t53s.vercel.app', // The other domain
    // Add more domains as needed
];

// CORS configuration
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
    .then(() => console.log('Database connected'))
    .catch(error => console.log('Database connection error:', error));

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userrouter);
app.use('/api/shop', shoprouter);
app.use('/api/userbooking', bookingrouter);
app.use('/api/shopowner', shopOwner);
app.use('/api/usershop', usershop);
app.use('/api/admin', adminrouter);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
