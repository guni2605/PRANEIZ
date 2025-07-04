import {User} from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  email = email.trim();
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.json({
      success:false,
      message: "User already exists with this email"});

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed });
    res.json({ 
      success:true,
      message: "User created"});
  } catch (err) {
    res.json({ 
      success:false,
      message: "Error creating user"});
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) return res.json({
      success:false,
      message: "Invalid credentials" });
   console.log(user,password);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.json({ 
      success : false,
      message: "Invalid credentials" });
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.json({
      success:true,
       token });
  } catch (err) {
    res.json({
      success:true,
       message: err.message });
  }
};

export const googleCallback = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.redirect(`http://localhost:5173?token=${token}`);
  } catch (err) {
    res.json({
      success:false,
       message: err.message });
  }
};
