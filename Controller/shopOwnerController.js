import mongoose from "mongoose";
import shopOwner from "../Models/shopOwnerSchema.js";
import ownerJoi from "../Validation/shopOwnerVAlidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Shop from "../Models/shopSchema.js";
import Booking from "../Models/bookingUserSchema.js";
import { sendmail } from "../Utility/nodeMailer.js";
import User from "../Models/userSchema.js";

export const ownerSignup = async (req, res) => {
  const { value, error } = ownerJoi.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  console.log(error);
  const {
    username,
    shopname,
    email,
    password,
    category,
    phone,
    district,
    state,
  } = value;

  try {
    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // already taken email
    const existingUser = await shopOwner.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "email already taken!",
      });
    }

    const newOwner = new shopOwner({
      username: username,
      shopname: shopname,
      email: email,
      password: hashedPassword,
      category: category,
      phone: phone,
      district: district,
      state: state,
    });
    await newOwner.save();
    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: newOwner,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const ownerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const uservalid = await shopOwner.findOne({ email });
    if (!uservalid) {
      return res.status(404).json({ error: "user not found" });
    }
    const validpassword = bcrypt.compareSync(password, uservalid.password);
    if (!validpassword) {
      return res.status(404).json({ error: "wrong credentials" });
    }
    const token = jwt.sign(
      { id: uservalid._id },
      process.env.OWNER_SECRET_TOKEN
    );
    const { password: hashedPassword, ...rest } = uservalid._doc;
    res.cookie("access_token", token, { httpOnly: true });
    return res
      .status(200)
      .json({ message: "successfully logged in", data: { ...rest, token } });
  } catch (error) {
    console.log(error);
  }
};
//view owner by id
export const ownerById = async (req, res) => {
  const ownerId = req.params.id;

  const owners = await shopOwner.findById(ownerId);
  if (!owners) {
    return res
      .status(404)
      .json({ Error: "not found", message: "user not found" });
  }
  return res
    .status(200)
    .json({ status: "success", message: "user found", data: owners });
};

//shop owner view booking detailes

export const allBookings = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const owner = await shopOwner.findById(ownerId).populate({
      path: "booking",
      populate: { path: "shopId" },
    });

    if (owner.length === 0) {
      return res.status(404).json({ message: "no bookings" });
    }
    return res
      .status(200)
      .json({ message: "successfully fetched", data: owner });
  } catch (error) {
    console.log(error);
  }
};

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

//shop owner edit shop

export const editShop = async (req, res) => {
  const ownerId = req.params.id;
  console.log(ownerId);

  try {
    const { shopname, phone, email, location, category, startTime, endTime } =
      req.body;
    const owner = await shopOwner.findById(ownerId).populate("shopId");

    if (!owner) {
      return res
        .status(404)
        .json({ status: "error", message: "Owner not found" });
    }

    if (owner.shopId && owner.shopId.length > 0) {
      await Shop.updateMany(
        { _id: { $in: owner.shopId } },
        {
          $set: {
            shopname,
            phone,
            email,
            location,
            category,
            startTime,
            endTime,
            image: req.cloudinaryImageUrl,
          },
        }
      );
    }
    const updatedShops = await Shop.find({ _id: { $in: owner.shopId } });

    return res.status(200).json({
      status: "success",
      message: "Successfully updated the shop details",
      data: updatedShops,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "An error occurred" });
  }
};

// edit shop owner

export const editOwner = async (req, res) => {
  const ownerId = req.params.id;
  console.log("Owner ID:", ownerId);

  const { username, shopname, phone, email } = req.body;
  console.log("Request Body:", req.body);

  try {
    const owner = await shopOwner.findByIdAndUpdate(
      ownerId,
      { $set: { username, shopname, phone, email } },
      { new: true }
    );

    if (!owner) {
      return res.status(404).json({
        status: "error",
        message: "Owner not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Successfully updated",
      data: owner,
    });
  } catch (error) {
    console.error("Error updating owner:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update owner",
    });
  }
};
// pending
export const BookingPending = async (req, res) => {
  const ownerId = req.params.id;

  try {
    const shop = await Shop.findOne({ ownerId }).populate("booking");

    if (!shop) {
      return res.status(404).json({ message: "No shop found for this owner" });
    }
    const pendingBookings = shop.booking.filter((data) => data.status == "pending");

    if (!pendingBookings || pendingBookings.length === 0) {
      return res.status(404).json({ message: "No pending bookings found" });
    }
    return res.status(200).json({ message: "Success", data: pendingBookings });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

//  a=shop owner accept 

export const bookingApprove=async(req,res)=>{
    const bookingId=req.params.id
    try {
      const bookings=await Booking.findById(bookingId)
      if(!bookings){
        return res.status(404).json({message:"no bookings"})
      }
      const user=await User.findById(bookings.userId)
      
      bookings.status="accept"
      await bookings.save()
      const userNotification = {
        email: user.email,
        subject: "Your booking status",
        text: "Your appointment is approved, please arrive on correct time",
        date: bookings.date,
        time: bookings.startTime,
      };
     await sendmail(userNotification)
     return res.status(200).json({message:"suucessfully accepted",data:bookings})
    } catch (error) {
      console.log(error);
      
    }
}
//owner reject bookings

 export const bookingReject=async(req,res)=>{
    const bookingId=req.params.id
    try {
      const bookings=await Booking.findById(bookingId)
      const user=await User.findById(bookings.userId)
       if(!bookings){
        return res.status(404).json({message:"booking not found"})
       }
       bookings.status="reject"
       await bookings.save()
       const userNotification = {
        email: user.email,
        subject: "Your booking status",
        text: "Your appointment is Rejected, Sorry",
        date: bookings.date,
        time: bookings.startTime,
      };
     await sendmail(userNotification)
       return res.status(200).json({message:"Booking rejected",data:bookings})
    } catch (error) {
      console.log(error);
      
    }
 }  
