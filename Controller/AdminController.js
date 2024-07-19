import jwt from'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../Models/userSchema.js'
dotenv.config()
export const adminLogin=async (req,res)=>{
    try {
        const{email,password}=req.body
        console.log(req.body ,'ff');
        if(email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD){
        const token=jwt.sign({email},process.env.ADMIN_ACCESS_TOKEN)
        res.cookie('access_token', token, { httpOnly: true });

            return res.status(200).json({ message: "Admin logged in successfully", token });
        }else{
            res.status(401).json({ error:"", message: "Unauthorized" });
        }
    } catch (error) {
        console.log(error);
    }
    
}
//fetch user in adminside

export const adminFetchUser=async(req,res)=>{
    try {
        const userslist=await User.find()
        if(!userslist){
            return res.status(404).json({error:"error not found", message:'User not Found'})
        }

        return res.status(200).json({status: "Ok", message: "User found", data: userslist})
    } catch (error) {
        console.log(error);
    }
}