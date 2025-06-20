import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextStore } from "../store/ContextStore";

const OrderDetails = () => {
  const { url } = useContext(ContextStore);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get(`${url}/api/v1/admin/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("atoken")}`,
        },
      })
      .then((res) => {
        setOrder(res.data.order);
        setStatus(res.data.order.status);
      });
  }, [orderId]);

  const handleStatusChange = async () => {
    await axios.put(
      `${url}/api/v1/admin/orders/${orderId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("atoken")}`,
        },
      }
    );
    alert("Status updated!");
  };

  const cancelOrder = async () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirm) return;
    await axios.put(
      `${url}/api/v1/admin/orders/${orderId}/status`,
      { status: "Cancelled" },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("atoken")}`,
        },
      }
    );
    alert("Order cancelled.");
    navigate("/orders");
  };

  if (!order) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Order Details
      </h2>

      <div className="bg-white border border-gray-200 p-5 rounded-lg shadow mb-6">
        <div className="space-y-2 text-sm md:text-base">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Customer:</strong> {order.userId?.name}
          </p>
          <p>
            <strong>Phone:</strong> {order.address?.phone}
          </p>
          <p>
            <strong>Address:</strong> {order.address?.address},{" "}
            {order.address?.city}, {order.address?.state} -{" "}
            {order.address?.pincode}
          </p>
          <p>
            <strong>Date:</strong> {new Date(order.date).toLocaleString()}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.amount}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4">
          <div className="flex gap-2 items-center">
            <label className="font-medium">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700"
              onClick={handleStatusChange}
            >
              Update Status
            </button>
            {status !== "Cancelled" && (
              <button
                className="bg-red-600 text-white px-4 py-1.5 rounded text-sm hover:bg-red-700"
                onClick={cancelOrder}
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {order.items.map((item, i) => (
            <div key={i} className="border rounded-lg p-4 bg-white shadow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {item.itemId?.images && (
                  <img
                    src={item.itemId.images[0]}
                    alt={item.itemId.name}
                    className="w-28 h-28 object-cover rounded"
                  />
                )}
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Product:</strong> {item.itemId?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Size:</strong> {item.size}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{item.itemId?.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
