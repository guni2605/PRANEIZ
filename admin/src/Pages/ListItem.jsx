import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ContextStore } from "../store/ContextStore";
import { toast } from "react-toastify";

const ListItem = () => {
  const { url } = useContext(ContextStore);
  const [itemList, setItemList] = useState([]);

  const getItemList = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/admin/list/items`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("atoken")}` },
      });

      if (response.data.success) {
        setItemList(response.data.items);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch items");
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this item?"
    );
    if (!confirm) return;

    try {
      const response = await axios.delete(`${url}/api/v1/admin/item/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("atoken")}` },
      });

      if (response.data.success) {
        toast.success("Item removed");
        setItemList((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      toast.error("Error removing item");
      console.log(error);
    }
  };

  useEffect(() => {
    getItemList();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">
        List of Items
      </h1>

      {itemList.length === 0 ? (
        <p className="text-center text-gray-500">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {itemList.map((item, index) => (
            <div
              key={item._id}
              className="bg-white p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="font-semibold text-lg text-gray-800">
                {item.name}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                {item.category} | {item.type}
              </p>
              <p className="text-gray-700 font-medium">₹{item.price}</p>
              <p className="text-xs text-gray-400">Stock: {item.stock}</p>

              <button
                onClick={() => handleDelete(item._id)}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-1.5 rounded text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListItem;
