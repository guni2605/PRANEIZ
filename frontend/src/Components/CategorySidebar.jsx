import React, { useContext } from "react";
import { ContextStore } from "../store/ContextStore";

const CategorySidebar = () => {
  const {
    categories,
    types,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
  } = useContext(ContextStore);

  return (
    <div className="w-full md:w-[25%] lg:w-[20%] bg-white rounded-lg shadow-sm p-4">
      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-center text-lg font-semibold mb-2">
          Select Categories
        </h2>
        <ul className="flex flex-wrap md:flex-col gap-2">
          {categories.map((item) => (
            <li
              key={item}
              onClick={() =>
                setSelectedCategory((prev) =>
                  prev.includes(item)
                    ? prev.filter((c) => c !== item)
                    : [...prev, item]
                )
              }
              className={`w-full border-2 px-3 py-1 rounded-md cursor-pointer text-sm text-center
                ${
                  selectedCategory.includes(item)
                    ? "bg-blue-100 text-blue-700 border-blue-500 font-semibold"
                    : "bg-white text-gray-800 border-zinc-300"
                }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Types */}
      <div>
        <h2 className="text-center text-lg font-semibold mb-2">Select Types</h2>
        <ul className="flex flex-wrap md:flex-col gap-2">
          {types.map((item) => (
            <li
              key={item}
              onClick={() =>
                setSelectedType((prev) =>
                  prev.includes(item)
                    ? prev.filter((t) => t !== item)
                    : [...prev, item]
                )
              }
              className={`w-full border-2 px-3 py-1 rounded-md cursor-pointer text-sm text-center
                ${
                  selectedType.includes(item)
                    ? "bg-blue-100 text-blue-700 border-blue-500 font-semibold"
                    : "bg-white text-gray-800 border-zinc-300"
                }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySidebar;
