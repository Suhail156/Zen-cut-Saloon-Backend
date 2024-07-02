import User from "../Models/userSchema.js";
import { sendOTP } from "../Utility/Verification.js";
import userjoi from "../Validation/userJoivalidation.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const otpStore = new Map();
dotenv.config()

 export const signup=async(req,res)=>{
    try {
        const{value,error}=userjoi.validate(req.body)
   //   console.log(req.body);

    if(error){
        return res.status(400).json({status:"error"})
    }
     const{username,email,password,phone}=value;
    
     //check email already had
     const existinguser=await User.findOne({email:email})
     if(existinguser){
        return res.status(400).json({status:"error",message:"already taken!"})
     }
     //hash password
     const hashedPassword=await bcrypt.hash(password,10)
   
       //otp
       const otp = await sendOTP(email);
       otpStore.set(email, { otp, timestamp: Date.now() });

     const  userData=new User({
        username:username,
        email:email,
        password:hashedPassword,
        phone:phone
     })
     otpStore.set(`${email}_data`, userData);
     await userData.save()
     return res.status(201).json({ status: "success",message: "OTP sent to email. Please verify",
        }); 
    } catch (error) {
        console.log(error);
    } 
 }

export const verifyOTP = async (req, res) => {
   const { email, otp } = req.body;
 
   const storedOtp = otpStore.get(email);
   const userData = otpStore.get(email + "_data");
 
   if (!storedOtp || storedOtp !== otp) {
     return res.status(400).json({ error: "Invalid or expired OTP." });
   }
 
   try {
     const newUser = new User(userData);
     await newUser.save();
 
     otpStore.delete(email);
     otpStore.delete(email + "_data");
 
     res.status(201).json({
       status: "Success",
       message: "User successfully registered.",
       data: newUser,
     });
   } catch (err) {
     console.error("Error during OTP verification:", err);
     res.status(500).json({ error: err.message });
   }
 };
   


 export const login = async (req, res) => {
   try {
       const { email, password } = req.body;
       console.log(req.body);

       const validUser = await User.findOne({ email });
       if (!validUser) {
           return res.status(404).json({ error: "user not found" });
       }

       const validPassword = bcrypt.compareSync(password, validUser.password);
       if (!validPassword) {
           return res.status(401).json({ error: "wrong credential" });
       }

       const token = jwt.sign({ id: validUser._id }, process.env.USER_SECRET_TOKEN);
       const { password: hashedPassword, ...rest } = validUser._doc;
       console.log(token);

       res.cookie("access_token", token, { httpOnly: true });
       return res.status(200).json({ message: 'successfully logged in', data: { ...rest, token } });
   } catch (error) {
       console.log(error, 'dd');
   }
};
