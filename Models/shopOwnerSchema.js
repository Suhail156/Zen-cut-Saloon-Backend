import mongoose from "mongoose";

const shopOwnerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  shopname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  category: [{
    type: String,
    required: true
  }]
});

const shopOwner = mongoose.model("shopOwner", shopOwnerSchema);
export default shopOwner;
