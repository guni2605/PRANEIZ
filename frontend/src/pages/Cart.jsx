import React, { useContext, useEffect } from "react";
import { ContextStore } from "../store/ContextStore";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartList,
    itemlist,
    addToCart,
    removeFromcart,
    totalAmount,
    setTotalAmount,
  } = useContext(ContextStore);

  const cartItems = Object.values(cartList);

  const getItemDetails = (itemId) =>
    itemlist.find((item) => item._id === itemId);

  // Calculate total price
  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, cartItem) => {
      const item = getItemDetails(cartItem.itemId);
      if (!item) return acc;

      const discountedPrice =
        item.price - item.price * (item.discount || 0) * 0.01;

      return acc + discountedPrice * cartItem.quantity;
    }, 0);

    setTotalAmount(totalPrice);
  }, [cartList]);
  // const totalPrice = cartItems.reduce((acc, cartItem) => {
  //   const item = getItemDetails(cartItem.itemId);
  //   if (!item) return acc;

  //   const discountedPrice =
  //     item.price - item.price * (item.discount || 0) * 0.01;

  //   return acc + discountedPrice * cartItem.quantity;
  // }, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-[20vh]">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((cartItem, index) => {
            const item = getItemDetails(cartItem.itemId);
            const discountedPrice =
              item?.price - item?.price * (item?.discount || 0) * 0.01;

            return (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-4 shadow rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item?.images[0]}
                    alt={item?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item?.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {cartItem.size}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      Quantity:
                      <button
                        onClick={() =>
                          removeFromcart(cartItem.itemId, cartItem.size, 1)
                        }
                        className="p-1 bg-red-100 text-red-600 rounded"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button
                        onClick={() =>
                          addToCart(cartItem.itemId, cartItem.size, 1)
                        }
                        className="p-1 bg-green-100 text-green-600 rounded"
                      >
                        <FaPlus size={12} />
                      </button>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">
                    ₹{(discountedPrice * cartItem.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() =>
                      removeFromcart(
                        cartItem.itemId,
                        cartItem.size,
                        cartItem.quantity
                      )
                    }
                    className="text-red-500 mt-2 flex items-center gap-1 text-sm"
                  >
                    <FaTrash size={12} /> Remove
                  </button>
                </div>
              </div>
            );
          })}

          {/* Total and Buy Button */}
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <h3 className="text-xl font-bold">
              Total: ₹{totalAmount.toFixed(2)}
            </h3>
            <button
              onClick={() => navigate("/placeorder")}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
