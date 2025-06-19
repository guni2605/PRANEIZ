import React from "react";
import { useNavigate } from "react-router-dom";

const ItemCard = ({
  id,
  name,
  description,
  type,
  category,
  stock,
  price,
  images,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`product/${id}`)}
      className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="bg-sky-100 aspect-square overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 text-center">
        <p className="text-lg font-bold font-mono truncate">{name}</p>
        <p className="text-md font-semibold text-gray-700 mt-1">Rs. {price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
