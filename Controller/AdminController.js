import jwt from'jsonwebtoken'
import dotenv from 'dotenv'
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
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        console.log(error);
    }
    
}