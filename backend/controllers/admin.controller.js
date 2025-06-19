import {v2 as cloudinary}  from 'cloudinary';
import ItemModel from '../models/itemModel.js';
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