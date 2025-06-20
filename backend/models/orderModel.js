import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ItemModel", // use the actual model name for items
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  status: {
    type: String,
    default: "Processing",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  payment: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export { OrderModel };
