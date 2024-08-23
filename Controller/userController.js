import User from "../Models/userSchema.js";
import { sendOTP } from "../Utility/Verification.js";
import userjoi from "../Validation/userJoivalidation.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Booking from "../Models/bookingUserSchema.js";
const otpStore = new Map();
dotenv.config()


export const signup = async (req, res) => {
   const { value, error } = userjoi.validate(req.body);
   if (error) {
     return res.status(400).json({ 
       status: "error",
       message: error.details[0].message 
     });
    }
  
   const { username, email, phone, password } = value;
 
   try {
     const hashedPassword = await bcrypt.hash(password, 10);
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).json({ 
         status: "error",
         message: "Email already taken." 
       });
     }
 
     const otp = await sendOTP(email);
     otpStore.set(email, otp);
 
     const userData = { username, email, phone, password: hashedPassword };
     otpStore.set(email + "_data", userData);
 
     return res.status(200).json({
       status: "success", 
       message: "OTP sent to email. Please verify.",
     });
   } catch (err) {
     console.error("Error during user registration:", err);
     return res.status(500).json({ 
       status: "error",
       message: "Internal server error." 
     });
   }
 };

 export const verifyOTP = async (req, res) => {
   const { email, otp } = req.body;
   const storedOtp = otpStore.get(email);
   const userData = otpStore.get(email + "_data");

   console.log(`Received OTP verification request for ${email}`); 

   if (!storedOtp || storedOtp !== otp) {
     console.log(`Invalid OTP for ${email}`); 
     return res.status(400).json({
       status: "error",
       message: "Invalid or expired OTP."
     });
   }

   try {
     const newUser = new User(userData);
     await newUser.save();

     otpStore.delete(email);
     otpStore.delete(email + "_data");

     console.log(`User ${email} successfully registered`); 

     return res.status(201).json({
       status: "success",
       message: "User successfully registered.",
       data: newUser,
     });
   } catch (err) {
     console.error("Error during OTP verification:", err);
     return res.status(500).json({
       status: "error",
       message: "Internal server error."
     });
   }
 };

 export const login = async (req, res) => {
   try {
       const { email, password } = req.body;

       if(email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD){
          const token = await jwt.sign({ data:email}, process.env.ADMIN_ACCESS_TOKEN);
          return res.status(200).json({
            message:"admin loginr",
            token
          })
        }



       const validUser = await User.findOne({ email });
       if (!validUser) {
           return res.status(404).json({ error: "user not found" });
       }  
         if(validUser.isDeleted==true){
          return res.status(400).json({message:"your account is suspended"})
         }
     
       const validPassword = bcrypt.compareSync(password, validUser.password);
       if (!validPassword) {
           return res.status(401).json({ error: "wrong credential" });
       }

       const token = jwt.sign({ id: validUser._id }, process.env.USER_SECRET_TOKEN);
       const { password: hashedPassword, ...rest } = validUser._doc;

       res.cookie("access_token", token, { httpOnly: true });
       return res.status(200).json({ message: 'successfully logged in', data: { ...rest, token } });
   } catch (error) {
       console.log(error, 'dd');
   }
};
// user find by id

export const UserViewById=async(req,res)=>{
   try {
     const userId=req.params.id

       const userDetailes=await User.findById(userId) 
       if(!userDetailes){
        return res.status(404).json({error:"User not found"})
        
       }
       return res.status(200).json({status: "success", message: "User found", data:userDetailes})
   } catch (error) {
    console.log(error);
   }
   
}
//user edit profile

export const editUser=async(req,res)=>{
  const userId=req.params.id
  const{username,phone,email}=req.body
  try {
    const users=await User.findByIdAndUpdate(userId,
      {$set:{username,phone,email}},
      {new:true}
    )
    if(!users){
      return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json({status:'Success',message:"Successfully Updated",data:users})
  } catch (error) {
    console.log(error);
    
  }
}
// user view booking deatiles

export const userViewBooking=async(req,res)=>{
   const userId=req.params.id
  try {
    const bookings=await User.findById(userId).
    populate({
      path:"booking",
      populate:{path:"shopId"}
    })
 
    
    if (bookings.length === 0) {
      return res.status(404).json({ message: "no bookings" });
    }
     return res.status(200).json({message:"successfully get booking details",data:bookings})
  } catch (error) {
    console.log(error);
    
  }
}