import Booking from "../Models/bookingUserSchema.js";
import shopOwner from "../Models/shopOwnerSchema.js";
import Shop from "../Models/shopSchema.js";
import User from "../Models/userSchema.js";
import { sendmail } from "../Utility/nodeMailer.js";


export const bookingUser = async (req, res) => {
  const userId = req.params.userid;
  const shopId = req.params.shopid;
  const OwnerId = req.params.ownerid
  try {
    const { startTime, username, phone, date } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ message: "shop is not found" });
    }
    const Owner = await shopOwner.findById(OwnerId);
    if (!Owner) {
      return res.status(404).json({ message: "Owner is not found" });
    }
    const booking = new Booking({
      startTime: startTime,
      phone: phone,
      username: username,
      date: date,
      shopId,
      userId,
    });
    user.booking.push(booking._id);
    shop.booking.push(booking._id);
    Owner.booking.push(booking._id)
    
    
    await user.save();
    await shop.save();
    await booking.save();
    await Owner.save()
    const dates = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const userdata = {
        email: user.email,
        subject: "Your booking status",
        text: 'Your Appointment is confirmed ',
        date:`${dates}`,
        time:`${startTime}`
      };
      
      await sendmail(userdata);
      const data = {
        email: Owner.email,
        subject: "Your booking status",
        text: 'a new appointment has been scheduled ',
         date:`${dates}`,
        time:`${startTime}`
      };
      
      await sendmail(data);


    return res.status(201).json({
      status: "success",
      message: "booking  successfully completed",
      data: booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
