import React from "react";

const ItemCard = ({
  id,
  name,
  images,
  stock,
  type,
  category,
  description,
  price,
}) => {
  // console.log(name);
  return (
    <div className=" flex-col m-2 gap-2  shadow-sm border-1 border-zinc-600 shadow-zinc-500 ">
      <div className="bg-sky-100">
        <img src={images[0]} alt="" className="" />
      </div>
      <p className="px-3 py-1 text-lg text-center font-bold font-mono ">
        {name}
      </p>
      <p className="px-3 py-1 text-lg text-center font-mono ">{category}</p>
      <p className="px-3 py-1 text-lg text-center font-mono ">{type}</p>
    </div>
  );
};

export default ItemCard;
