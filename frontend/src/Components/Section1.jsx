import React from "react";
import { assets } from "../assets/assets";

const Section1 = () => {
  return (
    <div>
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-poppins text-[#704d29] font-semibold mb-12">
          Elevate Your Style with PRANEIZ Collections :
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Category Card */}
          {[
            {
              img: assets.p_img1,
              title: "Women's Wear",
              desc: "Elegant designs for every occasion.",
            },
            {
              img: assets.p_img2_1,
              title: "Men's Collection",
              desc: "Classic style meets modern trends.",
            },
            {
              img: assets.p_img3,
              title: "Accessories",
              desc: "Statement pieces to elevate your look.",
            },
            {
              img: assets.p_img52,
              title: "New Arrivals",
              desc: "Fresh drops you can't miss.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-5 rounded-2xl border hover:shadow-xl transition-all bg-white"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 sm:h-60 lg:h-72 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-[#704d29] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Section1;
