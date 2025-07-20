import React, { useContext, useState } from "react";
import ShippingDetails from "../Components/ShippingDetails";
import { ContextStore } from "../store/ContextStore";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { url, cartList, totalAmount, getCartList } = useContext(ContextStore);
  const [shippingData, setShippingData] = useState(null);
  const navigate = useNavigate();
  const handleShippingSubmit = async (details) => {
    setShippingData(details);

    const res = await axios.post(
      `${url}/api/v1/user/place-order`,
      {
        cartList,
        shippingInfo: details,
        totalAmount,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(res.data);
    if (res.data.success) {
      const { razorpayOrderId, amount, key, orderId } = res.data;

      const options = {
        key,
        amount: amount,
        currency: "INR",
        name: "Your Store Name",
        description: "Test Transaction",
        order_id: razorpayOrderId,
        handler: async function (response) {
          const verifyRes = await axios.post(
            `${url}/api/v1/user/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderId,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          if (verifyRes.data.success) {
            toast.success("Payment successful!");
            getCartList();
            navigate("/");
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: details.name,
          email: "user@example.com", // optional
          contact: details.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      toast.error(res.data.message);
    }
  };

  // const handleShippingSubmit = async (details) => {
  //   setShippingData(details);
  //   // console.log("Shipping Info:", details);
  //   const res = await axios.post(
  //     `${url}/api/v1/user/place-order`,
  //     {
  //       cartList,
  //       shippingInfo: shippingData,
  //       totalAmount, // ✅ new field
  //     },
  //     {
  //       headers: {
  //         token: localStorage.getItem("token"),
  //       },
  //     }
  //   );
  //   //console.log(res.data);
  //   if (res.data.success) {
  //     toast.success("Order placed successfully!");
  //     getCartList();
  //     navigate("/");
  //   }
  //   // After this, show payment UI or trigger order placement
  // };

  return (
    <div className="mt-[20vh] p-4">
      {/* Show cart items here... */}

      <ShippingDetails onSubmit={handleShippingSubmit} />
    </div>
  );
};

export default PlaceOrder;
