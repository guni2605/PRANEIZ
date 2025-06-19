import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContextStore } from "../store/ContextStore";

const Product = () => {
  const { productId } = useParams();
  const [preview, setPreview] = useState();
  const { itemlist, addToCart } = useContext(ContextStore);
  const [filterItem, setFilterItem] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const filtered = itemlist.filter((item) => item._id === productId);
    setFilterItem(filtered);
    if (filtered[0]?.images?.length > 0) {
      setPreview(filtered[0].images[0]);
    }
  }, [itemlist, productId]);

  return (
    <div className="mt-24 px-4 sm:px-8 md:px-16">
      {filterItem.map((item) => {
        const parsedSizes =
          item.sizes.length === 1 && typeof item.sizes[0] === "string"
            ? item.sizes[0].split(",").map((s) => s.trim())
            : item.sizes;

        return (
          <div
            key={item._id}
            className="flex flex-col md:flex-row gap-10 bg-white rounded-xl shadow-lg p-6"
          >
            {/* Thumbnail List */}
            <div className="flex md:flex-col gap-3 md:w-1/5 overflow-x-auto md:overflow-visible">
              {item.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${item.name}-${index}`}
                  onClick={() => setPreview(img)}
                  className={`h-20 w-20 object-cover rounded-md cursor-pointer border ${
                    preview === img ? "border-blue-600" : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Main Preview */}
            <div className="flex justify-center items-center md:w-2/5">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-[400px] object-contain rounded-lg shadow"
              />
            </div>

            {/* Product Details */}
            <div className="md:w-2/5 flex flex-col gap-5">
              <h2 className="text-3xl font-bold text-gray-800">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>

              {item.discount > 0 ? (
                <div className="flex gap-4 items-center">
                  <span className="text-xl text-gray-400 line-through">
                    ₹{item.price}
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{Math.round(item.price * (1 - item.discount / 100))}
                  </span>
                  <span className="text-lg text-red-500 font-semibold">
                    ({item.discount}% OFF)
                  </span>
                </div>
              ) : (
                <div className="text-2xl font-semibold text-green-600">
                  ₹{item.price}
                </div>
              )}

              {/* Size and Quantity Selection */}
              <div className="bg-gray-50 p-4 rounded-md border space-y-4">
                <div>
                  <label
                    htmlFor="selectsize"
                    className="block font-medium mb-1"
                  >
                    Select Size
                  </label>
                  <select
                    id="selectsize"
                    className="w-full border rounded-md px-3 py-2"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="">-- Choose Size --</option>
                    {parsedSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="quantity" className="block font-medium mb-1">
                    Select Quantity
                  </label>
                  <select
                    id="quantity"
                    className="w-full border rounded-md px-3 py-2"
                    value={selectedQuantity}
                    onChange={(e) =>
                      setSelectedQuantity(Number(e.target.value))
                    }
                  >
                    {[1, 2, 3, 4, 5].map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  disabled={!selectedSize}
                  className={`w-full px-6 py-3 rounded-md text-white font-semibold transition ${
                    selectedSize
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    addToCart(item._id, selectedSize, selectedQuantity)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
