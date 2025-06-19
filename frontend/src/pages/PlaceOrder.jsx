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
    // console.log("Shipping Info:", details);
    const res = await axios.post(
      `${url}/api/v1/user/place-order`,
      {
        cartList,
        shippingInfo: shippingData,
        totalAmount, // ✅ new field
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    //console.log(res.data);
    if (res.data.success) {
      toast.success("Order placed successfully!");
      getCartList();
      navigate("/");
    }
    // After this, show payment UI or trigger order placement
  };

  return (
    <div className="mt-[20vh] p-4">
      {/* Show cart items here... */}

      <ShippingDetails onSubmit={handleShippingSubmit} />
    </div>
  );
};

export default PlaceOrder;
