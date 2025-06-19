import {Router} from 'express';
import { addToCart, getCartItems, placeOrder, removeFromCart,getOrders } from '../controllers/userController.js';
import { userAuth } from '../middlewares/userAuth.js';
export const userRouter = Router();
userRouter.post('/add/cart',userAuth,addToCart)
userRouter.post('/remove/cart',userAuth,removeFromCart);
userRouter.post('/get/cart',userAuth,getCartItems);
userRouter.post('/place-order',userAuth,placeOrder)
userRouter.post('/get/orders',userAuth,getOrders);