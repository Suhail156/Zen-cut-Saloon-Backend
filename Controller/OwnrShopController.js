import Shop from "../Models/shopSchema.js";

export const addShop = async (req, res) => {
    const { shopname, phone, email, location, category } = req.body;

    if (!req.cloudinaryImageUrl) {
        return res.status(400).json({
            status: "error",
            message: "Image upload failed or image not provided"
        });
    }

    const newShop = new Shop({
        shopname,
        phone,
        email,
        image: req.cloudinaryImageUrl,
        location,
        category
    });

    try {
        await newShop.save();
        return res.status(201).json({
            status: "success",
            message: "Shop added successfully",
            data: newShop
        });
    } catch (error) {
        console.error("MongoDB Error:", error);
        return res.status(500).json({
            status: "error",
            message: "Error saving shop to database"
        });
    }
};


export const viewShop=async(req,res)=>{

    const shops=await Shop.find()
    console.log(shops);
    if(!shops){
        return   res.status(404).json({meassge:"unable to get shops"})
    }
    return res.status(200).json({status:"success",message:"successfully fetched data",data:shops})
}

export const shopById=async(req,res)=>{
    const shopid=req.params.id
    const shops=await Shop.findById(shopid)
    if(!shops){
        return res.status(404).json({Error:"not found",message:"shop not found"})
    }
    return res.status(200).json({status: "success", message: "Product found", data: shops})


}