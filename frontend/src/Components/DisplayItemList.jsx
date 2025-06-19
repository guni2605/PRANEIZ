import React, { useContext, useEffect, useState } from "react";
import { ContextStore } from "../store/ContextStore";
import axios from "axios";
import ItemCard from "./ItemCard";

const DisplayItemList = () => {
  const { url, selectedCategory, selectedType, itemlist, setItemlist } =
    useContext(ContextStore);

  // const getItemList = async () => {
  //   try {
  //     const response = await axios.get(`${url}/api/v2/list/items`);
  //     if (response.data.success) {
  //       setItemlist(response.data.items);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getItemList();
  // }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {itemlist.map((item, index) =>
        (selectedCategory.length === 0 && selectedType.length === 0) ||
        ((selectedCategory.length === 0 ||
          selectedCategory.includes(item.category)) &&
          (selectedType.length === 0 || selectedType.includes(item.type))) ? (
          <ItemCard
            key={index}
            id={item._id}
            images={item.images}
            name={item.name}
            price={item.price}
            description={item.description}
            stock={item.stock}
            category={item.category}
            type={item.type}
          />
        ) : null
      )}
    </div>
  );
};

export default DisplayItemList;
