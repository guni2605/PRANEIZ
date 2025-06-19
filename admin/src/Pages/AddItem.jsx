import React, { useState, useContext } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { ContextStore } from "../store/ContextStore";

const categories = ["Men", "Women", "Kids"];
const types = ["topwear", "bottomwear", "footwear", "accessories"];
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const AddItem = () => {
  const { url } = useContext(ContextStore);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    type: "",
    discount: "",
    sizes: [],
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedImages = [...product.images];
    updatedImages[index] = file;
    setProduct((prev) => ({ ...prev, images: updatedImages }));
  };

  const toggleSize = (size) => {
    setProduct((prev) => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendUrl = url + "/api/v1/admin/add/item";

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("category", product.category);
    formData.append("type", product.type);
    formData.append("discount", product.discount || 0);
    formData.append("sizes", product.sizes.join(","));

    product.images.forEach((file) => {
      if (file) formData.append("images", file);
    });

    try {
      const response = await axios.post(backendUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error uploading:", error.response?.data || error.message);
      alert("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Add New Product
        </h2>

        {/* Upload Images */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Product Images (4)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative w-full aspect-square border border-gray-300 rounded-lg overflow-hidden"
              >
                <img
                  src={
                    product.images[index]
                      ? URL.createObjectURL(product.images[index])
                      : assets.add_item
                  }
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={product.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            required
          />
        </div>

        {/* Price / Stock / Discount */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price (₹)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Discount (%)
            </label>
            <input
              id="discount"
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="e.g. 10"
              min="0"
              max="90"
            />
          </div>
        </div>

        {/* Category & Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              value={product.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            >
              <option value="">Select Type</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Available Sizes
          </label>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-1 rounded-full border text-sm ${
                  product.sizes.includes(size)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-800 border-gray-300"
                } hover:bg-indigo-100 transition`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-2 rounded hover:bg-indigo-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddItem;
