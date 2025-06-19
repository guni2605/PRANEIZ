import React from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { ContextStore } from "../store/ContextStore";
import { useEffect } from "react";
import ItemCard from "../Components/ItemCard";
const ListItem = () => {
  const { url } = useContext(ContextStore);
  const [itemList, setItemList] = useState([]);
  const getItemList = async () => {
    try {
      const backendUrl = url + "/api/v1/admin/list/items";
      const response = await axios.get(backendUrl);
      // console.log(response);
      if (response.data.success) {
        setItemList(response.data.items);
        // console.log(itemList);
      } else {
        console.error("Failed to fetch items:", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItemList();
  }, []);

  return (
    <div className="w-[60%] mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">List of Items</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
        {itemList.map((item, index) => (
          <ItemCard
            key={index}
            id={item._id}
            images={item.images}
            name={item.name}
            description={item.description}
            price={item.price}
            stock={item.stock}
            category={item.category}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};

export default ListItem;
