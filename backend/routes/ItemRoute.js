import { Router } from "express";
import { getItems } from "../controllers/item.controller.js";

export const ItemRouter = Router();
ItemRouter.get("/list/items",getItems)