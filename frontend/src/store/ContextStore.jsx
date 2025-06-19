import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ContextStore = createContext({});
export const ContextProvider = (props) => {
  const categories = ["Men", "Women", "Kids"];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const types = ["topwear", "bottomwear", "middleware", "accessories"];
  const [itemlist, setItemlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [token, setToken] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token") ? true : false);
  }, []);
  const url = "http://localhost:3000";
  const getItemList = async () => {
    try {
      const response = await axios.get(`${url}/api/v2/list/items`);
      if (response.data.success) {
        setItemlist(response.data.items);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = async (itemId, size, quantity) => {
    console.log("Adding to cart", itemId, size, quantity);
    //console.log(localStorage.getItem("token"));
    try {
      const response = await axios.post(
        `${url}/api/v1/user/add/cart`,

        {
          itemId,
          size,
          quantity,
        },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        getCartList();
      } else {
        toast.error(response.data.message);
        //localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding item to cart");
    }
    // getCartList();
  };
  const removeFromcart = async (itemId, size, quantity) => {
    try {
      const response = await axios.post(
        `${url}/api/v1/user/remove/cart`,
        {
          itemId,
          size,
          quantity,
        },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getCartList();
      } else {
        toast.error(response.data.message);
        //  localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error removing item from cart");
    }
    getCartList();
  };
  const getCartList = async () => {
    try {
      const response = await axios.post(
        `${url}/api/v1/user/get/cart`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response);
      if (response.data.success) {
        setCartList(response.data.cartItems);
      } else {
        toast.error(response.data.message);
        //  localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching cart items");
    }
  };
  useEffect(() => {
    getItemList();
    setToken(localStorage.getItem("token"));
    getCartList();
  }, []);
  return (
    <ContextStore.Provider
      value={{
        itemlist,
        setItemlist,
        categories,
        types,
        url,
        selectedCategory,
        setSelectedCategory,
        selectedType,
        setSelectedType,
        addToCart,
        removeFromcart,
        getCartList,
        cartList,
        setIsLoggedIn,
        isLoggedIn,
        totalAmount,
        setTotalAmount,
      }}
    >
      {props.children}
    </ContextStore.Provider>
  );
};
