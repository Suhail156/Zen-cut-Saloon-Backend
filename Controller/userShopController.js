import Shop from "../Models/shopSchema.js"



export const userShopView=async(req,res)=>{
    try {
        const shops=await Shop.find()
        if(!shops){
            return res.status(401).json({meassge:"unable to get shops"})
         }
        return res.status(200).json({status:"success",message:"successfully fetched data",data:shops})
    } catch (error) {
        console.log(error);
    }

}

export const UserShopId=async(req,res)=>{
    try {
        const shopId=req.params.id
    const shops=await Shop.findById(shopId)
    if(!shops){
        return res.status(404).json({Error:"not found",message:"shop not found"})
        }
        return res.status(200).json({status: "Ok", message: "shop found", data: shops})
    } catch (error) {
       console.log(error); 
    }
    
}