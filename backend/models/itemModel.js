import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,

    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: ["Men", "Women", "Kids"],
      required: true,
    },
    type: {
      type: String,
      enum: ["topwear", "bottomwear", "footwear", "accessories"],
      required: true,
    },
    images: {
      type: [String], // Store image URLs or base64
      default: [],
    },
    discount: {
  type: Number,
  default: 0
},
    sizes:{
      type: [], // Store sizes as an array of strings
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

const ItemModel = mongoose.model("ItemModel", productSchema);

export default ItemModel;
