import Shop from "../Models/shopSchema.js";



// view all shop
export const userShopView = async (req, res) => {
  try {
    const shops = await Shop.find();
    if (!shops) {
      return res.status(401).json({ meassge: "unable to get shops" });
    }
    return res
      .status(200)
      .json({
        status: "success",
        message: "successfully fetched data",
        data: shops,
      });
  } catch (error) {
    console.log(error);
  }
};
// shop view by id
export const UserShopId = async (req, res) => {
  try {
    const shopId = req.params.id;
    const shops = await Shop.findById(shopId);
    if (!shops) {
      return res
        .status(404)
        .json({ Error: "not found", message: "shop not found" });
    }
    return res
      .status(200)
      .json({ status: "Ok", message: "shop found", data: shops });
  } catch (error) {
    console.log(error);
  }
};
// shopview by category
export const shopByCategory = async (req, res) => {
  try {
    const { locations } = req.query;
    const shops = await Shop.find({
      $or: [
        { location: { $regex: new RegExp(locations, "i") } },
        { shopname: { $regex: new RegExp(locations, "i") } },
        { category: { $regex: new RegExp(locations, "i") } },
      ],
    }).select("shopname number location image phone");
    if (shops.length === 0) {
      return res.status(404).json({ message: "no item found" });
    }
    return res.status(200).json({ shops });
  } catch (error) {
    console.log(error);
  }
};
