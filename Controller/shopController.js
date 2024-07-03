import Shop from "../Models/shopSchema.js"

export const addShop=async(req,res)=>{
    const{shopname,phone,email,image,location,category}=req.body
       console.log(req.body);
    const newShop=new Shop({
        shopname:shopname,
        phone:phone,
        email:email,
        image:image,
        location:location,
        category:category
    })
    
    try {
       
        await newShop.save();
        return res.status(201).json({
            status: "success",
            message: "shop added successfully",
            data: newShop,
        });
       

    } catch (error) {
        console.error(error);
      return res.status(500).json({
          status: "error",
          message: "Error  to database",
      });
  }
    }
