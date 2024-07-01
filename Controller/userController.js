import User from "../Models/userSchema.js";
import userjoi from "../Validation/userJoivalidation.js";
import bcrypt from 'bcrypt'

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
   
     const  newUser=new User({
        username:username,
        email:email,
        password:hashedPassword,
        phone:phone
     })

     await newUser.save()
     return res.status(201).json({ status: "success",message: "User registered successfully",
        data:newUser}); 
    } catch (error) {
        console.log(error);
    } 
 }

 export const login=async(req,res)=>{
    
 }