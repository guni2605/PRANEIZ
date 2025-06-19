import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="py-16 px-6 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-cursive text-[#3e2c20] mb-6">
            Welcome to Praneiz
          </h2>

          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Fashion, redefined with timeless charm and effortless grace. Step
            into a world where your style speaks volumes.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("/collection")}
              className="border-2 border-[#3e2c20] text-[#3e2c20] hover:bg-[#3e2c20] hover:text-white font-poppins px-8 py-3 rounded-full text-md font-semibold transition-all duration-300 ease-in-out tracking-wide shadow-sm hover:shadow-lg flex items-center gap-3 hover:scale-105"
            >
              Explore the Collection
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition-all duration-300 ease-in-out group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#3e2c20"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      <section className="py-12 px-6 bg-[#f8f1e5]">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="font-serifElegant text-3xl md:text-4xl italic text-[#3e2c20] leading-relaxed mb-6">
            "Fashion is not just about clothing; it's a way to express who you
            are without saying a word."
          </blockquote>
          <p className="text-lg text-gray-600 font-medium">
            Embrace your individuality. Every piece you wear speaks volumes
            about your personality and your vision. Let your style be your
            story.
          </p>
          {/* <div className="mt-6">
            <button className="bg-[#3e2c20] hover:bg-[#2e1f16] text-white px-6 py-3 rounded-full text-md font-semibold transition-all duration-300 ease-in-out tracking-wide shadow-sm hover:shadow-lg">
              Discover the Story
            </button>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Welcome;
