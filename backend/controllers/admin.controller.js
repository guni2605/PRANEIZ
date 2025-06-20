import {v2 as cloudinary}  from 'cloudinary';
import ItemModel from '../models/itemModel.js';
import jwt from 'jsonwebtoken';
import { OrderModel } from '../models/orderModel.js';
export const addItem = async (req ,res)=>{
  try {
    const {name,price,description,stock,category,type,images,sizes} = req.body;
   // console.log(req.body);
    const files = req.files;
    console.log(files);
    if (!name || !price || !description || !stock || !category || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }
   
    // cloudinary upload logic here
    const imagesUrls = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
      imagesUrls.push(result.secure_url);
    }
    const newItem = {
      name,
      price,
      description,
      stock,
      category,
      type,
      images: imagesUrls,
      sizes
    }
    // Save the new item to the database
    const item = await ItemModel.create(newItem);
    console.log(item)
    res.json({
      success:true,
      message: "Item added successfully",
      item
    })
    
  } catch (error) {
    console.log(error)
    return res.json({
      success:false,
      message:error.message
    })
  }
}
export const getAllItems = async(req,res)=>{
  try {
    const items = await ItemModel.find({});
    res.json({
      success: true,
      items
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
}
export const adminLogin =async (req,res)=>{
  const {email,password} = req.body;
  if(email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD){
    return res.json({
      success:false,
      message:"You are not authorised admin !"
    })
  }
  const atoken = jwt.sign({role:"admin",email},process.env.JWT_SECRET,{expiresIn:"1h"});
  return res.json({
    success:true,
    message:"Login successfully",
    atoken
  })
}
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
  .populate("userId", "name email")
  .populate("items.itemId", "name price images"); // gets populated item info


    res.json({ success: true, orders });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await OrderModel.findById(id)
      .populate("userId", "name email")
      .populate("items.itemId", "name price images");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("userId", "name email")
      .populate("items.product", "name price image");

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteItemByAdmin = async (req, res) => {
  try {
    const itemId = req.params.id;

    const deletedItem = await ItemModel.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};