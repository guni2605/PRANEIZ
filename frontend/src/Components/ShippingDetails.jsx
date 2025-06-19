import React, { useState } from "react";

const ShippingDetails = ({ onSubmit }) => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !shippingInfo.name ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    onSubmit(shippingInfo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Shipping Information</h2>

      <input
        name="name"
        placeholder="Full Name"
        value={shippingInfo.name}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={shippingInfo.phone}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />
      <textarea
        name="address"
        placeholder="Address"
        value={shippingInfo.address}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />
      <input
        name="city"
        placeholder="City"
        value={shippingInfo.city}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />
      <input
        name="state"
        placeholder="State"
        value={shippingInfo.state}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />
      <input
        name="pincode"
        placeholder="Pincode"
        value={shippingInfo.pincode}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Proceed to Payment
      </button>
    </form>
  );
};

export default ShippingDetails;
