import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'
  
dotenv.config()
export const adminToken=(req,res,next)=>{
    try {
        const token=req.headers["authorization"]
    if(!token){
       return res.status(404).json({error:"token not provided"})
    }
    Jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN,(err,decode)=>{
        if(err){
            res.status(404).json({error:"unauthorized"})
        }
        req.email=decode.email
        next()
    })
    } catch (error) {
      return next(error)  
    }
     
}