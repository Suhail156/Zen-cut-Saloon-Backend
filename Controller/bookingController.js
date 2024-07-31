import Booking from "../Models/bookingUserSchema.js"
import Shop from "../Models/shopSchema.js"
import User from "../Models/userSchema.js"

export const bookingUser=async(req,res)=>{
    const userId=req.params.userid
    console.log(userId);
    const shopId=req.params.shopid
    try {
        const {startTime,endTime,email,username}=req.body

       const user=await User.findById(userId)
        console.log(user);
       if(!user){
        return res.status(404).json({message:"user not found"})
       } 
       const shop=await Shop.findById(shopId)
       if(!shop){
        return res.status(404).json({message:"shop is not found"})
       }
        const booking=new Booking({
            startTime:startTime,endTime:endTime,email:email,username:username,
            shopId,userId,
        })
        user.booking.push(booking._id);
        shop.booking.push(booking._id);
        return res.status(201).json({
            status: "success",
            message: "booking  successfully completed",
            data: booking,
        });
    } catch (error) {
      console.log(error);  
      return res.status(500).json({ message: "Internal server error" });
    }

}
