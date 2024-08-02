import mongoose from "mongoose"
import shopOwner from "../Models/shopOwnerSchema.js"
import ownerJoi from "../Validation/shopOwnerVAlidation.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Booking from "../Models/bookingUserSchema.js"
import Shop from "../Models/shopSchema.js"

export const ownerSignup = async (req, res) => {
  const { value, error } = ownerJoi.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message
    });
  }
  console.log(error);
  const { username, shopname, email, password, category, phone ,district,state} = value;

  try {
    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // already taken email
    const existingUser = await shopOwner.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "email already taken!"
      });
    }

    const newOwner = new shopOwner({
      username: username,
      shopname: shopname,
      email: email,
      password: hashedPassword,
      category: category,
      phone: phone,
      district:district,
      state:state
    });
    await newOwner.save();
    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: newOwner
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};




export const ownerLogin=async(req,res)=>{
   try {
    const{email,password}=req.body
    const uservalid=await shopOwner.findOne({email})
    if(!uservalid){
      return res.status(404).json({error:"user not found"})
    }
    const validpassword=bcrypt.compareSync(password,uservalid.password)
    if(!validpassword){
      return res.status(404).json({error:"wrong credentials"})
    }
    const token = jwt.sign({ id: uservalid._id }, process.env.OWNER_SECRET_TOKEN);
    const { password: hashedPassword, ...rest } = uservalid._doc;
    res.cookie("access_token", token, { httpOnly: true });
       return res.status(200).json({ message: 'successfully logged in', data: { ...rest, token } });
   } catch (error) {
    console.log(error);
   }
}

//shop owner view booking detailes
  
export const allBookings=async(req,res)=>{

  try {
    const ownerId = req.params.id
    const owner = await shopOwner.findById(ownerId)
    .populate({
      path:'booking',
      populate:{path:'shopId'}
    })
    
  if(owner.length===0){
    return  res.status(404).json({message:"no bookings"})
  }
    return res.status(200).json({message:"successfully fetched",data:owner})
  } catch (error) {
    console.log(error)
  }
}

//shop owner view shop deatiles

export const allshops = async (req, res) => {
  const ownerId = req.params.id;
  try {
    const owner = await shopOwner.findById(ownerId).populate("shopId");
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json({ message: "Successfully fetched", data: owner });
  } catch (error) {
    console.error("Error fetching owner data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
  