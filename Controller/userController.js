import User from "../Models/userSchema.js";
import userjoi from "../Validation/userJoivalidation.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

    try {
      const{email,password}=req.body
      console.log(req.body);
     const validUser=await User.findOne({email})
     if(!validUser){
      return res.status(404).json({error:"user not found"})
     }
     const validPassword=bcrypt.compareSync(password,validUser.password)
     if(!validPassword){
      return res.status(401).json({error:"wrong credential"})
     }
     const token=jwt.sign({id:validUser._id},process.env.USER_SECRET_TOKEN)
     const{password:hashedPassword,...rest}=validUser._doc

      res.cookie("access token",token,{httpOnly:true})
     return  res.status(200).json({message:'successfuly lgined',data:rest})
    } catch (error) {
      console.log(error,'dd');
    }
    
 }
