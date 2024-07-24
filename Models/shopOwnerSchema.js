import mongoose from "mongoose";

const shopOwnerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  shopname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },

  category: [
    {
      type: String,
      required: true,
    },
  ],
  isAdmin:{
    type:Boolean,
    default:false
  }
});

const shopOwner = mongoose.model("shopOwner", shopOwnerSchema);
export default shopOwner;
