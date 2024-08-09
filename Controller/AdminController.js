import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/userSchema.js";
import shopOwner from "../Models/shopOwnerSchema.js";
import Shop from "../Models/shopSchema.js";
dotenv.config();
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.ADMIN_ACCESS_TOKEN);
      res.cookie("access_token", token, { httpOnly: true });

      return res
        .status(200)
        .json({ message: "Admin logged in successfully", token });
    } else {
      res.status(401).json({ error: "", message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
  }
};
//fetch user in adminside

export const adminFetchUser = async (req, res) => {
  try {
    const userslist = await User.find();
    if (!userslist) {
      return res
        .status(404)
        .json({ error: "error not found", message: "User not Found" });
    }

    return res
      .status(200)
      .json({ status: "Ok", message: "User found", data: userslist });
  } catch (error) {
    console.log(error);
  }
};

//admin block users
export const adminBlock = async (req, res) => {
  const userid = req.params.id;
  try {
    const userByid = await User.findById(userid);

    if (userByid.isDeleted == false) {
      userByid.isDeleted = true;
      await userByid.save();
      return res.status(200).json({ message: "Blocked" });
    } else {
      userByid.isDeleted = false;
      await userByid.save();
      return res.status(200).json({ message: "Unblocked" });
    }
  } catch (error) {
    console.log(error);
  }
};

//shop owner

//fetch shop owner in adminside
export const adminFetchShopOwners = async (req, res) => {
  try {
    const userslist = await shopOwner.find();
    if (!userslist) {
      return res
        .status(404)
        .json({ error: "error not found", message: "User not Found" });
    }

    return res
      .status(200)
      .json({ status: "Ok", message: "User found", data: userslist });
  } catch (error) {
    console.log(error);
  }
};
// admin approve and reject shopowner

export const adminApproveReject = async (req, res) => {
  try {
    const ownerslist = await shopOwner.find({ isAdmin: false });
    if (!ownerslist) {
      return res
        .status(404)
        .json({ error: "error not found", message: "User not Found" });
    }
    console.log(owner);
    return res
      .status(200)
      .json({ status: "Ok", message: " Pending Request ", data: ownerslist });
  } catch (error) {
    console.log(error);
  }
};

// fetch shop owner by id
export const adminFetchById = async (req, res) => {
  const ownerId = req.params.id;
  try {
    const owners = await shopOwner.findById(ownerId);
    if (!owners) {
      return res.status(200).json({ message: "not found" });
    }
    return res.status(200).json({ message: "found", owners });
  } catch (error) {
    console.log(error);
  }
};
// edit ownerDetailes
export const adminEditOwner = async (req, res) => {
    const ownerId = req.params.id;
    const { username, shopname, phone, email } = req.body;
  
    try {
      // Find and update the shop owner details
      const updatedOwner = await shopOwner.findByIdAndUpdate(
        ownerId,
        { $set: { username, shopname, phone, email } },
        { new: true }
      );
  
      if (!updatedOwner) {
        return res.status(404).json({
          status: "error",
          message: "Owner not found",
        });
      }
  
      return res.status(200).json({
        status: "success",
        message: "Successfully updated the owner details",
        data: updatedOwner,
      });
    } catch (error) {
      console.error("Error updating owner details:", error);
      return res.status(500).json({
        status: "error",
        message: "An error occurred while updating owner details",
      });
    }
  };
  


// view booking deatiles

export const adminViewBooking = async (req, res) => {
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
// admin shop view
export const adminViewShop = async (req, res) => {
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


