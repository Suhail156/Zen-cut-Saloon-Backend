import jwt from'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../Models/userSchema.js'
import shopOwner from '../Models/shopOwnerSchema.js'
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



//admin block users
export const adminBlock=async(req,res)=>{
     
    const userid=req.params.id
    try {
        
        const userByid=await User.findById(userid)
    
          if(userByid.isDeleted==false){
            (userByid.isDeleted=true)
            await userByid.save()
            return res.status(200).json({message:"Blocked"})
          }
          else{
            (userByid.isDeleted=false)
            await userByid.save()
            return res.status(200).json({message:"Unblocked"})
          }

    } catch (error) {
        console.log(error);
    }
}

//shop owner

//fetch shop owner in adminside
export const adminFetchShopOwners=async(req,res)=>{
    try {
        const userslist=await shopOwner.find()
        if(!userslist){
            return res.status(404).json({error:"error not found", message:'User not Found'})
        }

        return res.status(200).json({status: "Ok", message: "User found", data: userslist})
    } catch (error) {
        console.log(error);
    }
}

// fetch shop owner by id 
export const adminFetchById=async(req,res)=>{
      const ownerId=req.params.id
    try {
        const owners=await shopOwner.findById(ownerId)
        if(!owners){
            return res.status(200).json({message:"not found"})
        }
          return res.status(200).json({message:"found",owners})
    } catch (error) {
        console.log(error);
    }
}
// edit ownerDetailes
export const adminEditOwners=async(req,res)=>{
    const ownerId=req.params.id
    try {
        const{username,shopname,phone,email,password,state,district,category}=req.body

        const updateOwners=await shopOwner.findByIdAndUpdate(ownerId,
            {$set:{username,shopname,phone,email,password,state,district,category}},
            {new:true}
        )
        if(updateOwners){
            const updateOwners=await shopOwner.findById(ownerId)
            return res.status(200).json({
                status: "success",
                message: "successfully updated the product",
                data: updateOwners,
              })
        }
        else {
            return res
              .status(404)
              .json({ status: "error", message: "product not found" });
          }
    } catch (error) {
       console.log(error); 
    }
}