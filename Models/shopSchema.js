import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shopOwner",
    required: true,
  },
  shopname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
      required: true,
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  startTime: {
    type: String,
    // required:true
  },
  endTime: {
    type: String,
    // required:true
  },
  booking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
