import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ContextStore } from "../store/ContextStore";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const { url } = useContext(ContextStore);

  useEffect(() => {
    axios
      .get(`${url}/api/v1/admin/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("atoken")}`,
        },
      })
      .then((res) => setOrders(res.data.orders || []))
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-800">
        All Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <Link
              to={`/orders/${order._id}`}
              key={order._id}
              className="block p-4 sm:p-5 border border-gray-200 rounded-lg shadow hover:shadow-lg bg-white transition duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Left: Order Info */}
                <div className="space-y-1 w-full md:w-3/4">
                  <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                    Order ID: <span className="font-mono">{order._id}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Customer: {order.userId?.name || "Unknown"}
                  </p>
                  <p className="text-sm">
                    Status:{" "}
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-white text-xs sm:text-sm ${
                        order.status === "Completed"
                          ? "bg-green-500"
                          : order.status === "Cancelled"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>

                {/* Right: Price & Date */}
                <div className="text-sm sm:text-base text-gray-700 text-left md:text-right w-full md:w-1/4">
                  <p className="font-semibold text-black">
                    ₹{order.amount?.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
