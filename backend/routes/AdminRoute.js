import { Router } from "express";
import { addItem, getAllItems } from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.js";
const adminRouter = Router();
adminRouter.post("/add/item",upload.array("images",4),addItem)
adminRouter.get("/list/items",getAllItems);
export default adminRouter;