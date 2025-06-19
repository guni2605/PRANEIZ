import React, { useContext, useEffect, useState } from "react";
import { ContextStore } from "../store/ContextStore";
import axios from "axios";

const Orders = () => {
  const { url, cartList, itemlist } = useContext(ContextStore);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/v1/user/get/orders`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [cartList]);

  const getItemDetails = (itemId) => {
    return itemlist.find((item) => item._id === itemId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-[20vh] from-blue-50 to-purple-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
          🛍️ Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-600 text-lg mt-20">
            No orders found. Start shopping!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-200"
              >
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-indigo-600">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Amount:</span> ₹{order.amount}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">Address:</span>{" "}
                  {order.address?.address}
                </p>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Items:</h3>
                  <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
                    {order.items.map((item, index) => {
                      const product = getItemDetails(item.itemId);
                      return (
                        <div
                          key={index}
                          className="text-sm text-gray-700 flex justify-between border-b pb-1"
                        >
                          <div>
                            {product ? (
                              <>
                                <span className="font-medium">
                                  {product.name}
                                </span>{" "}
                                — {item.size}
                              </>
                            ) : (
                              "Item not found"
                            )}
                          </div>
                          <div className="text-right font-semibold">
                            × {item.quantity}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
