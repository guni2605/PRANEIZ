import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  googleId: String,
  cartdata:{
    type: Object,
    default:{}
  }
});

//export default mongoose.model("User", userSchema);
export const User = mongoose.model("User", userSchema);