import ItemModel from "../models/itemModel.js";

export const  getItems = async (req , res)=>{
   try {
    console.log("Fetching items...");
    const items = await ItemModel.find({});
    return res.json({
      success: true,
      items
    });
   } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message
    });
   }
}