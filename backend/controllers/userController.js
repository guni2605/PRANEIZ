import { OrderModel } from "../models/orderModel.js";
import { User } from "../models/User.js";
import crypto from "crypto";
import razorpayInstance from "../config/razorpay.js";
export const addToCart = async(req , res)=>{
      const {userId, itemId,quantity,size} = req.body;
      //console.log(req.body)
      if(!userId || !itemId || !quantity || !size){
        return res.json({
          success:false,
          message:"All fields are required"
        });
      }
      try {
        const userdata = await User.findById(userId);
       // console.log(userdata)
        const cartData = userdata.cartdata;
        const itemIndex = itemId + size;
        if(cartData[itemIndex]){
  cartData[itemIndex].quantity += quantity;
        }else{
          const item = {
            itemId,
            quantity,
            size
          }
          cartData[itemIndex] = item;
        }
       // console.log(cartData);
        await User.updateOne({_id:userId},{cartdata:cartData});
        return res.json({
          success:true,
          message:"Item added to cart successfully"
        })
      } catch (error) {
        return res.json({
          success:false,
          message:"Error adding item to cart"
        });
      }
}
export const removeFromCart = async(req,res)=>{
    const {userId,itemId,size,quantity} = req.body;
    if(!userId || !itemId || !size){
      return res.json({
        success:false,
        message:"All fields are required"
      });
    }
    try {
      const userdata = await User.findById(userId);
      const cartData = userdata.cartdata;
      const itemIndex = itemId + size;
      if(cartData[itemIndex].quantity > 1 && quantity == 1){
        cartData[itemIndex].quantity -= 1;
        
      }
      else{
        delete cartData[itemIndex];
      }
      await User.updateOne({_id:userId},{cartdata:cartData});
      return res.json({
        success:true,
        message:"Item removed from cart successfully"
      });
    } catch (error) {
      return res.json({
        success:false,
        message:error.message
      });
    }
}
export const getCartItems = async(req,res)=>{
  const {userId} = req.body;
  if(!userId){
    return res.json({
      success:false,
      message:"You are not logged in"
    });
  }
  try {
    const userdata = await User.findOne({_id:userId});
    if(!userdata){
      return res.json({
        success:false,
        message:"User not found"
      });
    }
    const cartData = userdata.cartdata;
    return res.json({
      success:true,
      cartItems:cartData
    });
  } catch (error) {
    return res.json({
      success:false,
      message:"Error fetching cart items"
    });
  }
}
// export const placeOrder = async(req,res)=>{
//   const {userId,cartList,shippingInfo,totalAmount} = req.body;
//   console.log(shippingInfo);
  
//   const cartData = Object.values(cartList)
//   //console.log(cartData)
//   if(!userId || !cartList){
//     return res.json({
//       success:false,
//       message:"All fields are required"
//     });
//   }
//   try {
//     const userdata = await User.findById(userId);

//     if(!userdata){
//       return res.json({
//         success:false,
//         message:"User not found"
//       });
//     }
//     if(Object.keys(cartList).length === 0){
//       return res.json({
//         success:false,
//         message:"Cart is empty"
//       });
//     }
//     const orderDetails = {
//       userId: userdata._id,
//       items: cartData,
//       amount: totalAmount,
//       address: shippingInfo,
//       status: "Processing",
//       payment: false
//     };
//    //console.log(orderDetails);
//    const newOrder =  await OrderModel.create(orderDetails);
//    console.log(newOrder);
//     // Here you can implement the logic to place the order
//     // For example, you can create an order model and save the order details
//     // For now, we will just clear the cart
//     userdata.cartdata = {};
//     await userdata.save();
    
//     return res.json({
//       success:true,
//       message:"Order placed successfully"
//     });
//   } catch (error) {
//     return res.json({
//       success:false,
//       message:error.message
//     });
    
//   }
// }


export const placeOrder = async (req, res) => {
    const { userId, cartList, shippingInfo, totalAmount } = req.body;
    console.log(totalAmount)

    const cartData = Object.values(cartList);

    if (!userId || !cartList) {
        return res.json({
            success: false,
            message: "All fields are required",
        });
    }

   try {
        const userdata = await User.findById(userId);
        if (!userdata) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }
        if (Object.keys(cartList).length === 0) {
            return res.json({
                success: false,
                message: "Cart is empty",
            });
        }

        // ✅ Create Razorpay order
        console.log("Creating Razorpay order...");
        const razorpayOrder = await razorpayInstance.orders.create({
            amount: totalAmount * 100, // in paise
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
        });
        if (!razorpayOrder) {
          console.log("Failed to create Razorpay order");
            return res.json({ 
                success: false,
                message: "Failed to create Razorpay order",
            });
          }
        // ✅ Temporarily create order in DB with payment=false
        const orderDetails = {
            userId: userdata._id,
            items: cartData,
            amount: totalAmount,
            address: shippingInfo,
            status: "Processing",
            payment: false,
        };

        const newOrder = await OrderModel.create(orderDetails);
      
        

        return res.json({
            success: true,
            message: "Order created, proceed to payment",
            orderId: newOrder._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
      console.log(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

export const getOrders = async(req,res)=>{
  const {userId} = req.body;
  if(!userId){
    return res.json({
      success:false,
      message:"You are not logged in"
    });
  }
  try {
    const orders = await OrderModel.find({userId});
    if(!orders){
      return res.json({
        success:false,
        message:"No orders found"
      });
    }
    return res.json({
      success:true,
      orders
    });
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    });
  }
}



export const verifyPayment = async (req, res) => {
  try{
    console.log("Verifying payment...");
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId ,userId} = req.body;
    const userdata = await User.findById(userId);
   
    const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generated_signature === razorpay_signature) {
        // ✅ Update order payment status
        await OrderModel.findByIdAndUpdate(orderId, { payment: true });
         userdata.cartdata = {};
        await userdata.save();
        return res.json({
            success: true,
            message: "Payment verified successfully",
        });
    }
  }
   catch(error) {
        return res.json({
            success: false,
            message: "Payment verification failed",
        });
    }
};
