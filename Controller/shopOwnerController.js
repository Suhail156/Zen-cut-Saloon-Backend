import shopOwner from "../Models/shopOwnerSchema.js"
import ownerJoi from "../Validation/shopOwnerVAlidation.js"
import bcrypt from 'bcrypt'


export const ownerSignup=async(req,res)=>{
        const{value,error}=ownerJoi.validate(req.body)
        console.log(req.body);
        if (error) {
            return res.status(400).json({ 
              status: "error",
              message: error.details[0].message 
            });
          }
        console.log(error);
        const{username,shopname,email,password,category,phone}=value
        console.log(value);
        try {

            //hashed password
            const hashedPassword = await bcrypt.hash(password, 10);


            //already taken email
            const existingUser = await shopOwner.findOne({ email:email });
             if (existingUser) {
           return res.status(400).json({
          status: "error",message: "email already taken!"});
           }


            const newOwner=new shopOwner({
                username:username,
                shopname:shopname,
                email:email,
                password:hashedPassword,
                category:category,
                phone:phone

            })
            await newOwner.save()
            return res.status(201).json({ status: "success",message: "User registered successfully",
                data:newOwner
              });
        } catch (error) {
            console.log(error);
        }
}