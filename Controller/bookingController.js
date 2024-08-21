import Booking from "../Models/bookingUserSchema.js";
import shopOwner from "../Models/shopOwnerSchema.js";
import Shop from "../Models/shopSchema.js";
import User from "../Models/userSchema.js";
import { sendmail } from "../Utility/nodeMailer.js";
import mongoose from "mongoose";

export const bookingUser = async (req, res) => {
  const userId = req.params.userid;
  const shopId = req.params.shopid;
  const ownerId = req.params.ownerid;

  try {
    const { startTime, username, phone, date } = req.body;

    if (!startTime || !username || !phone || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const owner = await shopOwner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const bookingDate = new Date(date);
    bookingDate.setHours(bookingDate.getHours() + 6);
    const formattedDate = bookingDate.toISOString().split("T")[0];

    const existingBooking = await Booking.findOne({
      shopId,
      date: formattedDate,
      startTime,
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "Booking already exists for this time and date" });
    }

    const booking = new Booking({
      startTime,
      phone,
      username,
      date: formattedDate,
      shopId,
      userId,
    });

    user.booking.push(booking._id);
    shop.booking.push(booking._id);
    owner.booking.push(booking._id);

    await user.save();
    await shop.save();
    await booking.save();
    await owner.save();

    const userNotification = {
      email: user.email,
      subject: "Your booking status",
      text: "Your appointment is confirmed.",
      date: formattedDate,
      time: startTime,
    };

    const ownerNotification = {
      email: owner.email,
      subject: "New booking scheduled",
      text: "A new appointment has been scheduled.",
      date: formattedDate,
      time: startTime,
    };

    await sendmail(userNotification);
    await sendmail(ownerNotification);

    return res.status(201).json({
      status: "success",
      message: "Booking successfully completed",
      data: booking,
      formattedDate,
    });
  } catch (error) {
    console.error("Error processing booking:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


// check availability
export const checkAvailability = async (req, res) => {
  try {
    const { shopId, date, startTime } = req.query;

    if (!shopId || !date || !startTime) {
      return res
        .status(400)
        .json({
          error: "Missing required parameters (shopId, date, or startTime)",
        });
    }

    if (!mongoose.Types.ObjectId.isValid(shopId)) {
      return res.status(400).json({ error: "Invalid shopId format" });
    }

    const shopObjectId = new mongoose.Types.ObjectId(shopId);

    const bookings = await Booking.find({
      shopId: shopObjectId,
      date: date,
      startTime: startTime,
    }).exec();

    if (bookings.length > 0) {
      return res
        .status(400)
        .json({ message: "Slot already booked for this date and time" });
    }

    res.status(200).json({
      message: "Slot is available for booking",
      date,
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
