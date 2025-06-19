import React from "react";
import DisplayItemList from "../Components/DisplayItemList";
import CategorySidebar from "../Components/CategorySidebar";

const Collection = () => {
  return (
    <div className="mt-[20vh] md:mt-[20vh] px-4 md:px-8 lg:px-16">
      {/* Heading with line */}
      <div className="text-center my-6">
        <h1 className="font-semibold text-2xl md:text-3xl font-poppins">
          Collections
        </h1>
        <div className="w-24 h-[3px] bg-zinc-400 mx-auto mt-2 rounded-full" />
      </div>

      {/* Content Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        <CategorySidebar />
        <div className="flex-1">
          <DisplayItemList />
        </div>
      </div>
    </div>
  );
};

export default Collection;
