import { Router } from "express";
import { addItem, adminLogin, deleteItemByAdmin, getAllItems, getAllOrders, getOrderById, updateOrderStatus } from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
const adminRouter = Router();
adminRouter.post("/add/item",verifyAdmin,upload.array("images",4),addItem)
adminRouter.get("/list/items",verifyAdmin,getAllItems);
adminRouter.post("/login",adminLogin)
adminRouter.get("/orders",verifyAdmin,getAllOrders)
adminRouter.get("/orders/:id", getOrderById);
adminRouter.put("/orders/:id/status", updateOrderStatus);
adminRouter.delete("/item/:id", verifyAdmin,deleteItemByAdmin);
export default adminRouter;